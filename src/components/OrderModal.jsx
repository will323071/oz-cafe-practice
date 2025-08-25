import { useState } from 'react'
import data from '../assets/data'
import { useCart } from '../context/cartContext'

function OrderModal ({selectedItem, setModalOn}) {
    const [ options, setOptions ] = useState({'온도': 0, '진하기': 0, '사이즈': 0});
    const [ cart, setCart ] = useCart();
    const [quantity, setQuantity] = useState(1);
    const itemOptions = data.options;

    const addToCart = () => {
        setCart([...cart, {...selectedItem, options, quantity, id: selectedItem.id},]);
        setModalOn(false);
    };

    return (
       <section className="modal-backdrop" onClick={() => setModalOn(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className='modal-item'>
                <img src={selectedItem.img} alt={selectedItem.name} />
                <div>
                    <h3>{selectedItem.name}</h3>
                    <div>{selectedItem.description}</div>
                </div>
            </div>
            <ul className='options'>
                {Object.keys(itemOptions).map((el) => (
                    <Option key={el} itemOptions={itemOptions[el]} options={options} setOptions={setOptions} />
                ))}
            </ul>
                <div className="submit">
                    <div>
                        <label htmlFor="count" >개수</label>
                        <input id="count" type="number" value={quantity} min='1' onChange={(event) => setQuantity(Number(event.target.value))} />
                    </div>
                    <button onClick={addToCart}>장바구니 넣기</button>
                </div>
                </div>
                </section>
    );
}

function Option({ name, options, setOptions, itemOptions }) {
    return (
        <li className="option">
            {name}
            <ul>
                {itemOptions.map((option, idx) => (
                    <li key={option}>
                        <input type='radio' name={name} checked={options[name] === idx} onChange={() => setOptions({...options, [name]: idx})} />
                        {option}
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default OrderModal;
