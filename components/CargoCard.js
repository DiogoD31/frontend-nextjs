import Link from 'next/link';

const CargoCard = ({ cargo }) => {
  console.log('cargo', cargo);
  const date = new Date(cargo.date).toDateString();
  return (
    <div className="article">
      <div className="article-info">
        <Link href={`/cargo/${cargo.slug}`}>
          <h2>{cargo.title}</h2>
        </Link>

        <img src={`http://localhost:1337${cargo.head.data.attributes.url}`} />

        {cargo.authors.data.map((athr, i) => (
          <p className="author-info" key={i}>
            <img src={`http://localhost:1337${athr.attributes.photo.data.attributes.url}`} />

            <Link href={`/author/${athr.attributes.username}`}>
              <a> {athr.attributes.name} </a>
            </Link><br />{' '} Created: {date}

          </p>
        ))}
      </div>
    </div>
  );
};

export default CargoCard;