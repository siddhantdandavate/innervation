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
        .limit(3);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
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
      <section className="py-20 lg:py-28 bg-muted/30">
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
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3">
            What Our Clients Say
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-background rounded-2xl p-6 lg:p-8 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-accent/20 mb-4" />
              
              {/* Rating */}
              {review.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-accent fill-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              )}

              <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4 text-base">
                "{review.review_text}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {review.avatar_url ? (
                  <img
                    src={review.avatar_url}
                    alt={review.customer_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold">
                      {getInitials(review.customer_name)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-foreground">
                    {review.customer_name}
                  </div>
                  {(review.customer_designation || review.customer_company) && (
                    <div className="text-muted-foreground text-sm">
                      {review.customer_designation}
                      {review.customer_designation && review.customer_company && ", "}
                      {review.customer_company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
