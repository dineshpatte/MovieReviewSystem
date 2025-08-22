"use client";
export default function ReviewList({ reviews }: any) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((review: any) => (
        <div key={review._id} className="border-b py-2">
          <p className="font-semibold">{review.userId?.name || "Anonymous"}:</p>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
