import { Star, Quote } from "lucide-react";
import { content } from "@/data/content";

const CustomerReviews = () => {
  const reviews = content.reviews;

  if (reviews.length === 0) return null;

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-accent/30 card-lift"
            >
              <Quote className="w-10 h-10 text-accent/20 mb-4" />

              {review.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-accent fill-accent" : "text-muted"
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
                  <img src={review.avatar_url} alt={review.customer_name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold">{getInitials(review.customer_name)}</span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-card-foreground">{review.customer_name}</div>
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
