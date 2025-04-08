import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const imgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex p-4 gap-4 items-start border-b  border-gray-700 ">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src="/avatar-placeholder.png" />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full">
        <textarea
          name=""
          id=""
          placeholder="What is happening?"
          className="textarea w-full resize-none border-none p-0 text-lg focus:outline-none"
          spellCheck="false"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
            {img && (
                <div className="relative w-72 mx-auto">
                    <IoCloseSharp
                     className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                     onClick={() => {
                        setImg(null);
                        imgRef.current.value = null;
                     }}
                    />
                    <img src={img} className="w-full mx-auto h-72 object-contain rounded" />
                </div>
            )}
    
        <div className="flex justify-between py-2 border-t border-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmile className="w-5 h-5 fill-primary" />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imgRef}
              onChange={handleImgChange}
            />
          </div>
            <button onClick={() => alert("Posted ....")} className="btn btn-primary rounded-full btn-sm text-white px-4">Post</button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
