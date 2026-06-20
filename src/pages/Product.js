import React, { useEffect, useState, Fragment, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increment } from "../config/redux/reducer/cartSlice";
import { Spinner } from "react-bootstrap";
import Slider from "rc-slider";
import ProductCard from "../components/ProductCard";
import ProductService from "../api/product/ProductService";
import CategoryService from "../api/category/CategoryService";
import toastify from "../components/Toastify";
import "rc-slider/assets/index.css";
import "../App.css";

function Product() {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: state?.categoryId || "",
    minPrice: 0,
    maxPrice: 10000,
  });

  const isFetchingNext = useRef(false);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // NEW: refs for fetch locking and request cancellation
  const isFetchingRef = useRef(false);
  const requestIdRef = useRef(0);

  const handleAdd = (event, product) => {
    event.stopPropagation();
    dispatch(increment(product));
    toastify.success("Product added to cart");
  };

  const fetchProducts = useCallback(
    async (pageNum, resetList = false) => {
      // Prevent concurrent "load more" calls, but allow reset (filters change)
      if (isFetchingRef.current && !resetList) return;

      const currentRequestId = ++requestIdRef.current;
      isFetchingRef.current = true;
      setLoading(true);

      try {
        const params = {
          page: pageNum,
          limit: 12,
          category: filters.category || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
        };

        Object.keys(params).forEach(
          (key) => params[key] === undefined && delete params[key]
        );

        const result = await ProductService.getProducts(params);

        // Ignore stale responses
        if (requestIdRef.current !== currentRequestId) return;

        if (result?.status) {
          const newProducts = result.data.products || [];
          const pagination = result.data.pagination;

          if (resetList) {
            setProducts(newProducts);
          } else {
            setProducts((prev) => {
              const existingIds = new Set(prev.map((p) => p._id));
              const uniqueNew = newProducts.filter((p) => !existingIds.has(p._id));
              return [...prev, ...uniqueNew];
            });
          }

          const totalPages = pagination?.totalPages || 1;
          setHasMore(pageNum < totalPages);
        } else {
          toastify.error("Failed to fetch products");
        }
      } catch (error) {
        toastify.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
        isFetchingNext.current = false;
      }
    },
    [filters] // ✅ only depends on filters
  );

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    isFetchingNext.current = false;
    fetchProducts(1, true);
  }, [fetchProducts]); // ✅ include fetchProducts

  // Fetch next page when page changes (but skip page 1)
  useEffect(() => {
    if (page > 1) {
      isFetchingNext.current = true;
      fetchProducts(page, false);
    }
  }, [page, fetchProducts]); // ✅ include fetchProducts

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading || !hasMore || isFetchingNext.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading && !isFetchingNext.current) {
          isFetchingNext.current = true;
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }
    );

    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, products]); // ✅ no change needed here

  // Fetch categories
  const getCategories = async () => {
    try {
      const params = { page: 1, limit: "all" };
      const result = await CategoryService.getCategories(params);
      if (result?.status) setCategories(result?.data?.categories || []);
    } catch (error) {
      toastify.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {/* LEFT SIDEBAR */}
          <div className="col-lg-3 col-md-4">
            <div className="my-4" style={{ position: "sticky", top: "90px" }}>
              <div className="filter-sidebar p-3 rounded-2 shadow-sm bg-white">
                <h5 className="fw-bold mb-4">
                  <i className="bi bi-funnel me-2"></i> Filters
                </h5>

                {/* Category Filter */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-secondary mb-3">
                    <i className="bi bi-tags me-2"></i> Categories
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className={`btn btn-sm rounded-pill px-3 ${filters.category === "" ? "btn-dark" : "btn-outline-secondary"
                        }`}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, category: "" }))
                      }
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        className={`btn btn-sm rounded-pill px-3 ${filters.category === cat._id ? "btn-dark" : "btn-outline-secondary"
                          }`}
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, category: cat._id }))
                        }
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h6 className="fw-semibold text-secondary mb-3">
                    <i className="bi bi-currency-rupee me-2"></i> Price Range
                  </h6>
                  <div className="price-slider-container px-1">
                    <Slider
                      range={true}
                      min={0}
                      max={10000}
                      step={100}
                      value={[filters.minPrice, filters.maxPrice]}
                      onChange={(values) => {
                        setFilters((prev) => ({
                          ...prev,
                          minPrice: values[0],
                          maxPrice: values[1],
                        }));
                      }}
                      trackStyle={[{ backgroundColor: "#000000", height: 6 }]}
                      handleStyle={[
                        {
                          backgroundColor: "#000000",
                          borderColor: "#000000",
                          height: 18,
                          width: 18,
                          borderRadius: "50%",
                          marginTop: -6,
                        },
                        {
                          backgroundColor: "#000000",
                          borderColor: "#000000",
                          height: 18,
                          width: 18,
                          borderRadius: "50%",
                          marginTop: -6,
                        },
                      ]}
                      railStyle={{ backgroundColor: "#e9ecef", height: 6 }}
                    />
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light">Rs.</span>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min={0}
                        max={filters.maxPrice}
                        value={filters.minPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val >= 0 && val <= filters.maxPrice) {
                            setFilters((prev) => ({ ...prev, minPrice: val }));
                          }
                        }}
                      />
                    </div>
                    <span className="align-self-center text-muted">—</span>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light">Rs.</span>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min={filters.minPrice}
                        max={10000}
                        value={filters.maxPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val >= filters.minPrice && val <= 10000) {
                            setFilters((prev) => ({ ...prev, maxPrice: val }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-outline-danger btn-sm w-100 mt-4 rounded-pill"
                  onClick={() =>
                    setFilters({ category: "", minPrice: 0, maxPrice: 10000 })
                  }
                >
                  <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-9 col-md-8">
            <div className="my-4">
              <div className="row g-3">
                {products?.length > 0 ? (
                  products.map((x, i) => {
                    const isLast = i === products.length - 1;
                    return (
                      <div
                        className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                        key={x._id || i}
                        ref={isLast ? sentinelRef : null}
                      >
                        <div className="card-container h-100">
                          <ProductCard
                            data={x}
                            id={x._id}
                            src={x.image}
                            Price={x.price}
                            CardTitle={x.name}
                            onClick={(e) => handleAdd(e, x)}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12 text-center py-5">
                    {loading ? (
                      <Spinner animation="grow" style={{ color: "#0d6efd" }} />
                    ) : (
                      <div>
                        <i className="bi bi-box-seam display-1 text-muted"></i>
                        <p className="mt-3 text-muted">No products found</p>
                      </div>
                    )}
                  </div>
                )}

                {loading && products.length > 0 && (
                  <div className="col-12 text-center py-3">
                    <Spinner animation="border" size="sm" style={{ color: "#0d6efd" }} />
                    <span className="ms-2 text-muted">Loading more...</span>
                  </div>
                )}

                {!hasMore && products.length > 0 && (
                  <div className="col-12 text-center py-3">
                    <span className="text-muted">— You've reached the end —</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Product;