import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from 'main-app/firebase/firebase';
import CInput from 'main-app/components/common/CInput/CInput';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const Register = () => {
  const [err, setErr] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [image, setImage] = useState(null);

  const onImageChange = (event: React.ChangeEvent) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const image = e.target[0].files ? e.target[0].files[0] : null;
    const displayName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    if (!image || !displayName || !email || !password) {
      setErr('All fields are mandotory!');
      setLoading(false);
    } else {
      try {
        const storageRef = ref(storage, displayName.replaceAll(' ', '_'));

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          () => {},
          () => {
            setErr('failed to upload image');
            setLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                try {
                  const res = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                  );

                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL
                  });

                  await setDoc(doc(db, 'users', res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                    searchName: displayName.toLowerCase()
                  });

                  await setDoc(doc(db, 'userChats', res.user.uid), {});

                  location.reload();
                } catch (error) {
                  setErr('something went wrong!');
                  setLoading(false);
                }
              }
            );
          }
        );
      } catch (error) {
        setErr('something went wrong!');
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex w-max h-[100vh]">
      <div className="h-full w-[400px] bg-theme-purple" />
      <div className="w-[calc(100vw-400px)] flex justify-center items-center">
        <div className="w-[300px]">
          <h1 className="text-center text-3xl">Sign up</h1>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mt-9">
              <input
                type="file"
                accept="image/*"
                name="avatar"
                className="hidden"
                id="user-avatar"
                onChange={onImageChange}
              />
              <label
                htmlFor="user-avatar"
                className="flex items-center justify-center mt-4 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full">
                  <img
                    title={image ? 'Avatar' : 'Upload profile image'}
                    className="w-16 h-16 rounded-full object-cover"
                    src={image ? image : '/images/icons/avatar.svg'}
                    alt="Avatar"
                  />
                </div>
              </label>
            </div>
            <CInput containerClasses="mt-3" type="text" label="Name" />
            <CInput containerClasses="mt-3" type="text" label="Email" />
            <CInput containerClasses="mt-3" type="password" label="Password" />
            {err && <span className="text-sm text-[#DC3545]">{err}</span>}
            <button className="bg-theme-purple block w-full text-white py-1.5 rounded-md mt-4">
              {loading ? (
                <span key={'loading'}
                  className={cn(
                    'block w-6 h-6 animate-spin rounded-full mx-auto',
                    'border-[4px] border-t-white border-b-white',
                    'border-r-[#ffffff55] border-l-[#ffffff55]'
                  )}
                />
              ) : (
                <span key={'text'} className="block h-6">Sign up</span>
              )}
            </button>
            <span className="block text-center mt-1 text-sm mt-2">
              Already have an account?{' '}
              <Link
                className="text-blue-700 hover:border-b border-blue-700"
                to="/login"
              >
                Signin here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
