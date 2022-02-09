import { useState, useCallback } from "react";
import axios from 'axios'

const App = () => {
  const [image, setImage] = useState({})
  
  const handleImage = useCallback(e => {
    if (!e.target.files) return
    setImage(e.target.files) 
  }, [setImage])
  // const handleImage = useCallback(e => {
  //   if (!e.target.files[0]) return
  //   setImage(e.target.files[0]) 
  // }, [setImage])

  console.log(image)

  const uploadImageFile = useCallback(async e => {
    e.preventDefault();

    const formData = new FormData();

    // formData.append('upload', image);
    
    for (let i = 0; i < image.length; i++) {
      formData.append('upload', image[i]);
    }

    await axios.post(
      '/users/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  }, [image])
  
  return (
    <div className='App'>
      <h1>react upload image</h1>
      <form
        onSubmit={e => uploadImageFile(e)}
        encType='multipart/form-data'
      >
        <label htmlFor='upload-image-btn'>
          select image
          <input
            type='file'
            accept='image/*'
            name='upload'
            id='upload-image-btn'
            multiple
            style={{
              display:'none'
            }}
            onChange={e => handleImage(e)}
          />
        </label>
        <hr />
        <input
          type='submit'
          value='upload'
        />
      </form>
      <hr />
    </div>
  );
}

export default App;
