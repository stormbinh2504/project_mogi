import { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../firebase/firebaseconfig";
import { v4 } from "uuid";

export const useOnClickOutside = (ref, handleClick) => {
    useEffect(() => {
        const listener = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClick(event);
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handleClick]);
};



export const uploadImgToFireBase = (imageUpload, setUrl) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    console.log("binh_uploadImgToFireBase", url)
                    setUrl && setUrl(url)
                    // setImageUrls((prev) => [...prev, url]);
                });
        })
        .catch((error) => {
            alert(error)
        })
};
