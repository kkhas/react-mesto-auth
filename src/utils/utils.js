function renderLoading(isLoading, popupSelector, value, newValue) {
  
  if(isLoading) {
    popupSelector.querySelector('.popup__save-button').value = newValue
  } else {
    popupSelector.querySelector('.popup__save-button').value = value
  }
}
export {renderLoading}

