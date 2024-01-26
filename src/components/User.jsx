import styles from "./User.module.css";

function User() {
  return (
    <div className={styles.user}>
      <img src="https://i.pravatar.cc/100?u=ac" alt="user profile image" />
      <span className="text-2xl">Welcome, Niamh</span>
    </div>
  );
}

export default User;
