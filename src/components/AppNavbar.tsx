import { useEffect, useState } from "react";
import { CategoryDatum } from "@/models/category-response";
import { getTopCategories } from "@/api/strapi";
import Link from "next/link";
import Image from "next/image";

export default function AppNavbar() {
  const [categories, setCategories] = useState<CategoryDatum[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const data = await getTopCategories();
      setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <header>
      <section className="header-bottom">
        <div className="container">
          <div className="head-container">
            <div className="head-bottom-left">
              <Link href="/" legacyBehavior>
                <a>
                  <Image
                    src="/logo.png"
                    alt="C Tech logo"
                    width={80}
                    height={80}
                  />
                </a>
              </Link>
            </div>
            <div className="head bottom-right">
              <ul className="header-nav">
                <li>
                  <Link href="/" legacyBehavior>
                    <a className="btn btn-black">Home</a>
                  </Link>
                </li>
                {categories.length > 0 &&
                  categories.map((category: CategoryDatum) => {
                    return (
                      <li key={category.id}>
                        <Link
                          href={`/categories/${category.id}`}
                          legacyBehavior
                        >
                          <a className="btn btn-black">
                            {category.attributes.name}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
              <ul>
                <li
                  className="hamb-menu btn btn-black"
                  onClick={() => setActive(!active)}
                >
                  <i className="fas fa-bars"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`mobile-tablet-hamb-menu ${active ? "mobile-menu-active" : ""
            }`}
        >
          <ul>
            <li className="active">
              <a href="#" className="btn btn-black">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-black">
                Voce
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-black">
                Voce
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-black">
                Voce
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-black">
                Voce
              </a>
            </li>
            <li
              className="btn btn-black close-menu"
              onClick={() => setActive(!active)}
            >
              <i className="fas fa-times"></i>
            </li>
          </ul>
        </div>
      </section>
    </header>
  );
}
