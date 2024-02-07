import { Post } from "@/models/post";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
};

const PostPreview: React.FC<Props> = ({ post }) => {
  const { id, title, excerpt, date, images, categories } = post;
  const image = images ? images[0] : null;
  const category = categories ? categories[0] : null;

  return (
    <div className="post">
      <div className="post-img">
        {image && (
          <Image src={image.url} alt={image.alt} width={578} height={325} />
        )}
      </div>
      <div className="post-text">
        <h3>
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="btn btn-black">{title}</a>
          </Link>
        </h3>
        <span>
          {category && (
            <Link href={`/categories/${category.id}`} legacyBehavior>
              <a className="btn btn-black">{category.name}</a>
            </Link>
          )}
        </span>
        <span className="bar"></span>
        <span>{date}</span>
        <p>{excerpt.substring(0, 200) + "[...]"}</p>
        <span>
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="btn btn-black">Leggi tutto</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PostPreview;
