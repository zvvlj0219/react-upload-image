import { useState, useCallback, useEffect } from "react";
import axios from 'axios'
import ImageSlider from "./Carousel";

// db
const pastPost = [
  '1645176118514.jpg',
  '1645176087747.jpg',
  '1645176034565.jpg'
]

const App = () => {
  const [image, setImage] = useState({})
  const [previewSrc, setPreviewSrc] = useState([])
  const [post, setPost] =useState([])

  const fetchUserPost = useCallback(async () => {
    for (let i = 0; i < pastPost.length; i += 1) {
      const res = await import(`./assets/${pastPost[i]}`)
      setPost(post => {
        return [
          ...post,
          res.default
        ]
      })
    }
  }, [post, setPost])
  
  const previewer = useCallback(file => {
    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = event => {
      setPreviewSrc(previewSrc => {
        return [
          ...previewSrc,
          event.target.result
        ]
      })
    }
  }, [previewSrc])

  const handleImage = useCallback(e => {
    if (!e.target.files) return
    setImage(e.target.files)

    for (let i = 0; i < e.target.files.length; i += 1) {
      previewer(e.target.files[i])
    }
  }, [setImage])

  const removeImage = useCallback(src => {
    const refreshedState = previewSrc.filter(el => {
      return el !== src
    })
    setPreviewSrc(refreshedState)
  }, [previewSrc, setPreviewSrc])


  const uploadImageFile = useCallback(async e => {
    e.preventDefault();

    const formData = new FormData();
    
    for (let i = 0; i < image.length; i++) {
      formData.append('upload-img-pass', image[i]);
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
      setPreviewSrc([])
      console.log('successfully uploaded')
    })
    .catch(err => {
      console.log(err);
    });
  }, [image])

  useEffect(() => {
    fetchUserPost()
  }, [])
  
  return (
    <div className='App'>
      <h1>React Upload Image</h1>
      <ImageSlider imageData={pastPost} />
      <hr />
      <form
        className='select_image'
        onSubmit={e => uploadImageFile(e)}
        encType='multipart/form-data'
      >
        <label htmlFor='upload-image-btn'>
          select image
          <hr />
          <input
            type='file'
            accept='image/*'
            name='upload-img-pass'
            id='upload-image-btn'
            multiple
            style={{
              display:'none'
            }}
            onChange={e => handleImage(e)}
          />
        </label>
          {
            previewSrc.length > 0 && (
              <div className='preview_image'>
                <p>preview</p>
                {
                  previewSrc.map(src => (
                    <div key={src}>
                      <img
                        src={src}
                        alt=''
                        style={{
                          width: '300px',
                          height: '200px'
                        }}
                      /> 
                      <button
                        type='button'
                        onClick={() => removeImage(src)}
                        style={{
                          display: 'block',
                          marginLeft: '20px'
                        }}
                      >
                        delete
                      </button>
                      <div style={{margin: '20px'}} />
                    </div>
                  ))
                }
                <input
                  type='submit'
                  value='upload'
                  style={{
                    display: 'block',
                    marginTop: '15px',
                    width: '200px',
                    height: '30px'
                  }}
                />
              </div>
            )
          }
      </form>
      <div className='user_post'>
        <p>user posts</p>
        {
          post.length > 0 ? (
           post.map(src => (
            <div key={src}>
              <img
                src={src}
                alt=''
                style={{
                  display: 'block',
                  marginTop: '15px',
                  width: '300px',
                  height: '200px'
                }}
              />
            </div>
           ))
          ) : (
            <p>Loading ...</p>
          )
        }
      </div>
    </div>
  );
}

export default App;
