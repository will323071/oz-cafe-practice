import data from "../assets/data";
import { useCart } from "../context/cartContext";

function Cart() {
  const { cart, setCart } = useCart();

  if (!cart.length) {
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        장바구니에 담긴 상품이 없어요!
      </div>
    );
  }

  const remove = (id) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  return (
    <>
      <h2>장바구니</h2>
      <ul className='cart'>
          {cart.map((el) => (
          <li key={el.id} className="Cart-Item">
        <div className="cart-item-info">
        <img height={100} src={el.img} alt={el.name} />
        <div>{el.name}</div>
      </div>
      <div className="cart-item-option">
        {el.options && Object.keys(el.options).map((optKey) => (
          <div key={optKey}>
            {optKey} : {data.options[optKey][el.options[optKey]]}
          </div>
        ))}
        <div>개수 : {el.quantity}</div>
      </div>
      <button
        className="cart-item-delete"
        onClick={() => remove(el.id)}
      >
        삭제
      </button>
    </li>
          ))}
        </ul>
    </>
  );
}

export default Cart;
