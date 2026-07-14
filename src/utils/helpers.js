export function setButtonText(
  isLoading,
  btn,
  defaultText = "Save",
  loadingText = "Saving...",
) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}

// universal function that accepts a request function, event and a default loading text 
export function handleSubmit(request, evt, loadingText = 'Saving...') {
 // You need to prevent the default action in any submit handler
  evt.preventDefault();

  // the button is always available inside `event` as `submitter`
  const submitButton = evt.submitter;
  // fix the initial button text
  const initialText = submitButton.textContent;
  // change the button text before requesting
  setButtonText(true, submitButton, initialText, loadingText);
  // call the request function to be able to use the promise chain
  request()
    .then(() => {
      // resetting any form after response	
      evt.target.reset();
    })
      // catching errors
    .catch(console.error)      

    // and in finally we need to stop loading
    .finally(() => {
      setButtonText(false, submitButton, initialText);
    });
}