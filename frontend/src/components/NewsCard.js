import "./NewsCard.css";

function NewsCard({ post }) {
  return (
    <div className="news-card">
      {/* LEFT CONTENT */}
      <div className="news-left">
        <h3 className="news-title">{post.title}</h3>

        <p className="news-text">{post.content}</p>

        <span className="news-date">
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* RIGHT IMAGE */}
      {post.image && (
        <div className="news-right">
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
          />
        </div>
      )}
    </div>
  );
}

export default NewsCard;
