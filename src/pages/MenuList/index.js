import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Paper, Typography, CircularProgress, Box } from "@mui/material";

import nonVegIcon from "../../images/red.png";
import vegIcon from "../../images/green.png";
import { getMenuList } from '../store/menuList/actions';
import {  incrementQuantity, decrementQuantity } from '../store/menuList/cartSlice'

export  const MenuList = () => {
  const {data: menuDataList, isLoading} = useSelector(state => state.tableMenuList);
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  const [selectedMenuCat, setSelectedMenuCat] = useState(null);

  useEffect(() => {
    dispatch(getMenuList());
  }, []);

  useEffect(() => {
   if((menuDataList?.length > 0)) {
    setSelectedMenuCat(menuDataList?.[0]?.menu_category_id);
   }
  }, [menuDataList]);

  const totalQty = useMemo(() => {
    let total = 0
    cart.forEach(cartItem => {
      total += cartItem.quantity;
    })
    return total;
  }, [cart])
  
  const onCategoryChange = (e, catId) => {
    setSelectedMenuCat(catId);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', marginInlineStart: '340px' }}>
      <Typography variant="h4" style={{ color: 'white', fontSize: '1rem' }}>
        Artisan Resto Cafe
      </Typography>

      <div style={{ position: 'relative', marginRight: '360px', color: 'white', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>My orders</span>
        <svg class="w-8 h-8 ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="1.5em" height="1.5em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3.5c0-.28.22-.5.5-.5h.44c.72 0 1.14.47 1.38.94.17.32.29.72.39 1.06H16a1 1 0 0 1 .96 1.27l-1.5 5.28A2 2 0 0 1 13.55 13H8.46a2 2 0 0 1-1.93-1.47L5.9 9.17l-.01-.03-1.03-3.5-.1-.33a5.2 5.2 0 0 0-.32-.91c-.16-.31-.3-.4-.5-.4H3.5a.5.5 0 0 1-.5-.5Zm3.84 5.37.66 2.4a1 1 0 0 0 .96.73h5.08a1 1 0 0 0 .96-.73L16 6H6l.84 2.87ZM10 15.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Zm6 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z" fill="currentColor"></path>
        </svg>
        <div className='cart-wrapper'>
          <span
            className="cart-count"
          >
         {totalQty}
          </span>
        </div>
      </div>
    </div>
      <Paper>
        <Tabs
          value={selectedMenuCat}
          onChange={onCategoryChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ backgroundColor: 'black' }}
        >
          {menuDataList?.map?.((menuList) => (
            <Tab
              key={menuList?.menu_category_id}
              label={
                <Typography style={{ color: selectedMenuCat === menuList?.menu_category_id ? 'red' : 'white', textTransform: 'none', fontSize: '14px' }}>
                  {(menuList?.menu_category)}
                </Typography>
              }
              value={menuList?.menu_category_id}
              sx={{ backgroundColor: 'black' }}
            />
          ))}
        </Tabs>
      </Paper>
      <div id="menuContent" className="menu-content">
        {selectedMenuCat && (
          <div className="tab" id={selectedMenuCat}>
            {menuDataList            
                  ?.find((menuItem) => menuItem?.menu_category_id == selectedMenuCat)?.category_dishes
            ?.map((dishDetails, index) => (
                  <div key={`${dishDetails?.dish_id}`} className="dish-item">
                    <div className="dish-details">
                      <Typography variant="h6" style={{ color: 'white', fontSize: '13px', fontFamily: 'Arial', display: 'flex', alignItems: 'center' }}>
                        { index % 2 === 0 ? 
                        <img src={nonVegIcon} alt="" className="dish-s-img" /> :
                        <img src={vegIcon} alt="" className="dish-s-img" /> }
                        {dishDetails?.dish_name}
                      </Typography>
                      <Typography className="dish-c-wrapper">
                        <span>{dishDetails?.dish_currency} {dishDetails?.dish_price}</span>
                        <span className="dish-cal">{dishDetails?.dish_calories} Calories</span>
                      </Typography>
                      <Typography className="dish-desc">
                        {dishDetails?.dish_description}
                      </Typography>
                      <br />
                      <button
                        className="cart-add-btn"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          const buttonWidth = e.currentTarget.offsetWidth;
                          const clickPosition = e.clientX - e.currentTarget.getBoundingClientRect().left;
                          if (clickPosition < buttonWidth / 2) {
                            dispatch(decrementQuantity(dishDetails))
                          }
                          if (clickPosition >= buttonWidth / 2) {
                            dispatch(incrementQuantity(dishDetails))
                          }
                        }}
                      >
                        <p className="p-cart-add-btn">-</p>
                        <span className="p-cart-add-btn">
                          { (cart?.length && cart?.find((cartItem) => cartItem?.dish_id == dishDetails?.dish_id)?.quantity) || 0}
                          </span>
                        <p className="p-cart-add-btn">+</p>
                      </button>
                      {dishDetails?.addonCat && dishDetails?.addonCat.length > 0 && (
                        <div style={{ color: 'red', marginTop: '10px', fontSize: '11px' }}>
                          Customizations available
                        </div>
                      )}
                    </div>
                    <div className="dish-info">
                      <img
                        className="dish-image"
                        src={dishDetails?.dish_image}
                        alt=""
                        style={{ width: '120px', height: '100px', borderRadius: '10px' }}
                      />
                    </div>
                  </div>
                )
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
