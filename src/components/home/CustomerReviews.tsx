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
      <section className="py-20 bg-muted/30">
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
    <section className="py-20 bg-muted/30">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-muted-foreground text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
            What Our Clients Say
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-background rounded-2xl p-6 border border-border hover:border-[hsl(72,100%,50%)]/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-[hsl(72,100%,50%)]/30 mb-4" />
              
              {/* Rating */}
              {review.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-[hsl(72,100%,50%)] fill-[hsl(72,100%,50%)]"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              )}

              <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                "{review.review_text}"
              </p>

              <div className="flex items-center gap-3">
                {review.avatar_url ? (
                  <img
                    src={review.avatar_url}
                    alt={review.customer_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[hsl(72,100%,50%)]/20 flex items-center justify-center">
                    <span className="text-[hsl(72,100%,50%)] font-semibold text-sm">
                      {getInitials(review.customer_name)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {review.customer_name}
                  </div>
                  {(review.customer_designation || review.customer_company) && (
                    <div className="text-muted-foreground text-xs">
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
