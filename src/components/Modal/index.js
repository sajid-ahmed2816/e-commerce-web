import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { increment } from "../../config/redux/reducer/cartSlice";
import ProductService from "../../api/products/ProductService";
import PrimaryButton from "../../components/PrimaryButton";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastify from "../../components/Toastify";

function MyModal({ show, onHide, data }) {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!show || !data?._id) return;

    let cancelled = false;

    const fetchProduct = async () => {
      setIsLoading(true);
      setProduct(null);
      setVariants([]);
      setSelectedAttributes({});
      setSelectedVariant(null);
      setSelectedImageIndex(0);

      try {
        const response = await ProductService.getProductById(data._id);

        if (!cancelled && response?.status) {
          const fetchedProduct = response.data.product;
          const fetchedVariants = response.data.variants || [];

          setProduct(fetchedProduct);
          setVariants(fetchedVariants);

          // Single variant without attributes can be selected automatically
          if (
            fetchedVariants.length === 1 &&
            !(fetchedVariants[0].attributes || []).length
          ) {
            setSelectedVariant(fetchedVariants[0]);
          }
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch product details:", error);
          toastify.error("Failed to load product details");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [show, data?._id]);

  // Reset gallery when selected variant changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant?._id]);

  // Build attribute options from available variants
  const attributeOptions = {};

  variants.forEach((variant) => {
    (variant.attributes || []).forEach((item) => {
      const attributeName = item.attribute?.name;
      const valueName = item.value?.value;

      if (!attributeName || !valueName) return;

      if (!attributeOptions[attributeName]) {
        attributeOptions[attributeName] = [];
      }

      if (!attributeOptions[attributeName].includes(valueName)) {
        attributeOptions[attributeName].push(valueName);
      }
    });
  });

  // Find exact matching variant
  const findMatchingVariant = (attributes) => {
    const selectedKeys = Object.keys(attributes);

    if (!selectedKeys.length) return null;

    return (
      variants.find((variant) => {
        const variantAttributes = variant.attributes || [];

        if (variantAttributes.length !== selectedKeys.length) {
          return false;
        }

        const attributeMap = {};

        variantAttributes.forEach((item) => {
          attributeMap[item.attribute?.name] = item.value?.value;
        });

        return selectedKeys.every(
          (attributeName) =>
            attributeMap[attributeName] === attributes[attributeName]
        );
      }) || null
    );
  };

  const handleAttributeChange = (attributeName, value) => {
    const updatedAttributes = {
      ...selectedAttributes,
      [attributeName]: value,
    };

    const matchingVariant = findMatchingVariant(updatedAttributes);

    if (matchingVariant) {
      setSelectedAttributes(updatedAttributes);
      setSelectedVariant(matchingVariant);
      return;
    }

    // Keep the selection if it can still match an existing variant
    const partialMatch = variants.some((variant) => {
      const attributeMap = {};

      (variant.attributes || []).forEach((item) => {
        attributeMap[item.attribute?.name] = item.value?.value;
      });

      return Object.entries(updatedAttributes).every(
        ([name, selectedValue]) =>
          attributeMap[name] === selectedValue
      );
    });

    if (partialMatch) {
      setSelectedAttributes(updatedAttributes);
      setSelectedVariant(null);
      return;
    }

    // Invalid combination: retain the latest choice
    setSelectedAttributes({
      [attributeName]: value,
    });

    setSelectedVariant(null);
  };

  // Get selected variant images
  const variantImages = (selectedVariant?.images || []).map((image) =>
    typeof image === "string" ? image : image?.url
  ).filter(Boolean);

  // Compatibility with older single-image data
  const productImage = product?.thumbnail || product?.image || "";

  const galleryImages = variantImages.length
    ? variantImages
    : selectedVariant?.image
      ? [selectedVariant.image]
      : productImage
        ? [productImage]
        : [];

  const currentImage = galleryImages[selectedImageIndex] || galleryImages[0] || "";

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toastify.error("Please select all options first");
      return;
    };

    if (selectedVariant.stock <= 0) {
      toastify.error("This variant is out of stock");
      return;
    };

    const cartItem = {
      product: product._id,
      variant: selectedVariant._id,
      sku: selectedVariant.sku,
      name: product.name,
      price: selectedVariant.price,
      image: currentImage,
    };

    dispatch(increment(cartItem));
    toastify.success("Product added to cart");
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="product-detail-modal"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton style={{ alignItems: "center" }}>
        <Modal.Title id="product-detail-modal">
          {product?.name || data?.name || data?.title || "Product Details"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          height: "calc(100vh - 150px)",
          overflowY: "auto"
        }}
      >
        {isLoading ? (
          <div className="text-center py-5 h-100 d-flex align-items-center justify-content-center">
            <Spinner animation="grow" style={{ color: "#000000" }} />
          </div>
        ) : !product ? (
          <div className="text-center py-5 h-100 d-flex align-items-center justify-content-center">
            <p>Product details are unavailable.</p>
          </div>
        ) : (
          <div className="row">
            {/* Product / Variant Image Gallery */}
            <div className="col-md-5 mb-4">
              <div
                style={{
                  position: "sticky",
                  top: 0
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center border rounded"
                  style={{
                    minHeight: "280px",
                    padding: "12px",
                  }}
                >
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span className="text-muted">No image available</span>
                  )}
                </div>

                {/* Multiple image thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        aria-label={`View image ${index + 1}`}
                        aria-pressed={selectedImageIndex === index}
                        onClick={() => setSelectedImageIndex(index)}
                        className="bg-white rounded p-1"
                        style={{
                          width: "58px",
                          height: "58px",
                          border:
                            selectedImageIndex === index
                              ? "2px solid #212529"
                              : "1px solid #dee2e6",
                        }}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Information */}
            <div className="col-md-7">
              <h4>{product.name}</h4>

              <p>{product.description}</p>

              <p>
                <strong>Category:</strong>{" "}
                {product.category?.name || "N/A"}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                {selectedVariant
                  ? `$${selectedVariant.price}`
                  : "Select all options"}
              </p>

              {/* Variant Attributes */}
              {Object.entries(attributeOptions).map(
                ([attributeName, values]) => (
                  <div
                    key={attributeName}
                    className="mb-3"
                  >
                    <h6>{attributeName}</h6>

                    <div className="d-flex flex-wrap gap-2">
                      {values.map((value) => {
                        const isSelected = selectedAttributes[attributeName] === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            className={`btn btn-sm ${isSelected ? "btn-dark" : "btn-outline-dark"
                              }`}
                            aria-pressed={isSelected}
                            style={{
                              minWidth: attributeName === "Size" ? "40px" : "auto",
                            }}
                            onClick={() =>
                              handleAttributeChange(attributeName, value)
                            }
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

              {/* Selected Variant Details */}
              {selectedVariant && (
                <div className="mt-3">
                  <h6>Selected Variant</h6>

                  <p className="mb-2">
                    <strong>SKU:</strong>{" "}
                    {selectedVariant.sku || "N/A"}
                  </p>

                  <p className="mb-3">
                    <strong>Stock:</strong>{" "}
                    {selectedVariant.stock > 0
                      ? `${selectedVariant.stock} available`
                      : "Out of stock"}
                  </p>

                  <PrimaryButton
                    icon={<FontAwesomeIcon icon={faCartShopping} />}
                    onClick={handleAddToCart}
                    title="Add to Cart"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MyModal;