export const Product = (item) => {
  const { id, name, imageUrl, price, category } = item;
  return (
    <div className="item" style={{ cursor: 'pointer' }} data-aos="zoom-in" data-aos-duration="5000">
      <figure className="small-container">
        <figcaption className='caption'>
          <div>{category}</div></figcaption>
        <img src={imageUrl} alt="img" />
      </figure>
      <div className="detail">
        <div className="company">{name}</div>
        <div className="price">₹{price}</div>
      </div>
    </div>
  )
}
