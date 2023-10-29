const getData = async () => {
  const response = await fetch('https://27.javascript.pages.academy/kekstagram/data');
  return response.json();
};


const sendData = (form) => {
  const formData = new FormData(form);

  return fetch(
      'https://27.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      }
  )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Request Failed', error);
        throw error; // re-throw the error to propagate it to the caller
      });
};


export {getData, sendData};
