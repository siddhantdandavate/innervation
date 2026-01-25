import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  customer_name: string;
  customer_designation: string | null;
  customer_company: string | null;
  review_text: string;
  rating: number;
  avatar_url: string | null;
  is_featured: boolean;
}

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-brand-lime text-brand-lime" : "text-gray-300"}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <section className="section-padding bg-secondary">
        <div className="container-narrow">
          <div className="text-center">
            <p className="text-muted-foreground">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-brand-lime bg-brand-lime/10 px-4 py-2 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-6 mb-4">
            What Our <span className="text-brand-lime">Clients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from businesses that have transformed their operations with our technology solutions
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border relative ${
                review.is_featured ? "lg:scale-105 ring-2 ring-brand-lime/30" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-lime/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">{renderStars(review.rating)}</div>

              {/* Review Text */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                "{review.review_text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {review.avatar_url ? (
                  <img
                    src={review.avatar_url}
                    alt={review.customer_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime font-semibold text-sm">
                    {getInitials(review.customer_name)}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-foreground text-sm">
                    {review.customer_name}
                  </h4>
                  {(review.customer_designation || review.customer_company) && (
                    <p className="text-muted-foreground text-xs">
                      {review.customer_designation}
                      {review.customer_designation && review.customer_company && ", "}
                      {review.customer_company}
                    </p>
                  )}
                </div>
              </div>

              {/* Featured Badge */}
              {review.is_featured && (
                <div className="absolute -top-2 -left-2 bg-brand-lime text-foreground text-xs font-semibold px-2 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;