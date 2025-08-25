import { useState } from "react";
import Item from "./Item";
import OrderModal from "./OrderModal";
import { useMenu } from "../context/menuContext";

function Menu() {
  const [modalOn, setModalOn] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);
  const { menu } = useMenu();

  if (!menu)
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        메뉴 정보가 없어요!
      </div>
    );

  const categorys = Object.keys(menu);
  return (
    <>
      {categorys.map((category) => (
        <section key={category}>
          <h2>{category}</h2>
          <ul className="menu">
            {menu[category].map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  clickHandler={() => {
                    setModalMenu(item);
                    setModalOn(true);
                  }}
                />
              ))}
            </ul>
          </section>
      ))}
      {modalOn && (
        <OrderModal
          selectedItem={modalMenu}
          setModalOn={setModalOn}
        />
      )}
    </>
  );
}

export default Menu;
