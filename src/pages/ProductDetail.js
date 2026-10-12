import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increment } from "../config/redux/reducer/cartSlice";
import ProductService from "../api/products/ProductService";
import PrimaryButton from "../components/PrimaryButton";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastify from "../components/Toastify";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch product and its variants
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getProductById(id);

        if (response?.status) {
          setProduct(response.data.product);
          setVariants(response.data.variants || []);
          setSelectedAttributes({});
          setSelectedVariant(null);
          setSelectedImageIndex(0);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Selected variant change hone par first image show karo
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant?._id]);

  // Product thumbnail fallback
  const productImage = product?.thumbnail || product?.image || "";

  // Selected variant ki saari images
  const selectedVariantImages = (selectedVariant?.images || [])
    .map((image) =>
      typeof image === "string" ? image : image?.url
    )
    .filter(Boolean);

  // Old single-image data ke liye fallback
  const variantImages = selectedVariantImages.length
    ? selectedVariantImages
    : selectedVariant?.image
      ? [selectedVariant.image]
      : [];

  // Variant ki images nahi hain to product thumbnail show hogi
  const galleryImages = variantImages.length
    ? variantImages
    : productImage
      ? [productImage]
      : [];

  const currentImage =
    galleryImages[selectedImageIndex] || galleryImages[0] || "";

  // Build attribute options
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

  // Find an exact matching variant
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

    // Check whether current selection can still form a valid variant
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

    // Conflict: keep the latest choice
    setSelectedAttributes({
      [attributeName]: value,
    });

    setSelectedVariant(null);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toastify.error("Please select all options first");
      return;
    }

    if (selectedVariant.stock <= 0) {
      toastify.error("This variant is out of stock");
      return;
    }

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
    <div className="container">
      {product && (
        <div className="row py-3">
          {/* Product / Variant Image Gallery */}
          <div className="col-md-6 mb-4">
            <div
              className="d-flex align-items-center justify-content-center border rounded"
              style={{
                minHeight: "400px",
                padding: "20px",
              }}
            >
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "400px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <p className="text-muted">No image available</p>
              )}
            </div>

            {/* Image thumbnails */}
            {galleryImages.length > 1 && (
              <div
                className="d-flex flex-wrap gap-2 mt-3"
                aria-label="Product images"
              >
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={selectedImageIndex === index}
                    className="p-1 bg-white rounded"
                    style={{
                      width: "75px",
                      height: "75px",
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

            {selectedVariant && variantImages.length > 1 && (
              <p className="text-muted small mt-2">
                {selectedImageIndex + 1} of {galleryImages.length} images
              </p>
            )}
          </div>

          {/* Product Information */}
          <div className="col-md-6">
            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category?.name}
            </p>

            {/* Price */}
            <p>
              <strong>Price:</strong>{" "}
              {selectedVariant
                ? `$${selectedVariant.price}`
                : "Select all options to view price"}
            </p>

            {/* Attributes */}
            {Object.entries(attributeOptions).map(
              ([attributeName, values]) => (
                <div
                  key={attributeName}
                  style={{ marginBottom: "20px" }}
                >
                  <h4>{attributeName}</h4>

                  <div className="d-flex flex-wrap gap-2">
                    {values.map((value) => {
                      const isSelected =
                        selectedAttributes[attributeName] === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          className={`btn btn-sm ${isSelected ? "btn-dark" : "btn-outline-dark"}`}
                          style={{
                            minWidth: attributeName === "Size" ? "40px" : "auto",
                          }}
                          aria-pressed={isSelected}
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

            {/* Selected Variant Information */}
            {selectedVariant && (
              <div style={{ marginTop: "20px" }}>
                <h4>Selected Variant</h4>

                <p>
                  <strong>SKU:</strong>{" "}
                  {selectedVariant.sku}
                </p>

                <p>
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
    </div>
  );
}

export default ProductDetail;