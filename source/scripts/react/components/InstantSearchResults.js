import { h } from 'preact';
import imgUrl from 'UTILS/images/imgUrl';
import ProductPrice from './ProductPrice';

function InstantSearchResultsListItem({ title, url, featuredImage, product, isPackBuild }) {
  if (!isPackBuild) {
    const className = 'instant-search-results__list-item';
    return (
      <li className={`${className}`}>
        <div className={`${className}__image-wrapper`}>
          <img src={imgUrl(featuredImage.url, 130)} />
        </div>
        <div className={`${className}__details`}>
          <div className={`${className}__title h3`}>
            <a href={`${url}`}>{title}</a>
          </div>
          <div className={`${className}__price`}>
            <ProductPrice price={product.price} compareAtPrice={product.compare_at_price_max} />
          </div>
        </div>
      </li>
    );
  }
}

function InstantSearchResults({ results }) {
  return (
    <div className="instant-search-results">
      {results && results?.products?.length ? (
        <ul className="instant-search-results__list list-unstyled">
          {results.products.map((p) => (
            <InstantSearchResultsListItem
              title={p.title}
              url={p.url}
              price={p.price}
              featuredImage={p.featured_image}
              product={p}
              isPackBuild={p.type.toLowerCase().includes('builder')}
              key={p.id}
            />
          ))}
        </ul>
      ) : (
        <div class="text-center">No results found</div>
      )}
    </div>
  );
}

export default InstantSearchResults;
