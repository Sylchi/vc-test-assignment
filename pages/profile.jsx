import withSession from "../lib/session";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';
import SubmitButton from '../components/SubmitButton';
import { LogoutIcon } from '@heroicons/react/solid';


const Profile = ({ user: { firstName, lastName, email } }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signOut = async () => {
    setLoading(true);
    await fetch('/api/logout').then(res => res.json()).then(data => {
      if(data.isLoggedIn === false){
        router.push('/login');
      } else {
        toast.error('Something went wrong')
      }
      setLoading(false);
    })
  }
  return (
    <>
    <Toaster />
    <div className="flex items-center justify-center flex-col min-h-[100vh]">
      <div>Hello {firstName} {lastName}!</div>
      <SubmitButton label="Sign out" icon={LogoutIcon} onClick={signOut} loading={loading} className="max-w-[150px] mt-5" />
    </div>
    </>
  );
}

export default Profile;

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

Profile.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }),
};