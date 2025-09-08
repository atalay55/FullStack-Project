import { useEffect, useState } from "react";
import styles from "./user.module.css";
import { FaEdit, FaTrash, FaUserCircle, FaEnvelope } from "react-icons/fa";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  User,
} from "../utils/userFetch";
import { CONSTANT } from "../constants/Constant";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";
import ButtonGroup from "../components/ButtonGroup";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorExist, setErrorExist] = useState(false);
  const { darkMode } = useTheme();
  const [phase, setPhase] = useState<"phase1" | "phase2">("phase1");

  const loadUsers = async () => {
    try {
      const data = await fetchUsers(phase);
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
    setName("");
    setSurname("");
    setEmail("");
    setEditingId(null);
  }, [phase]);

  const handleSubmit = async () => {
    if (errorExist) return;

    const payload = { name, surname, email };

    if (editingId !== null) {
      if (phase === "phase1") {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingId ? { ...u, ...payload } : u))
        );
      } else {
        try {
          await updateUser(phase, editingId, payload);
          loadUsers();
        } catch (err) {
          console.error(err);
        }
      }
      setEditingId(null);
    } else {
      try {
        const response = await addUser(phase, payload);
        if (phase === "phase1") {
          setUsers((prev) => [...prev, response]);
        } else {
          loadUsers();
        }
      } catch (err) {
        console.error(err);
      }
    }

    setName("");
    setSurname("");
    setEmail("");
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(phase, id);

      if (phase === "phase1") {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        loadUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.userForm} ${darkMode ? styles.darkCard : ""}`}>
      <Header title="Users" />

      <ButtonGroup
        firstButtonLabel="Phase 1"
        secondButtonLabel="Phase 2"
        firstClickEvent={() => setPhase("phase1")}
        secondClickEvent={() => setPhase("phase2")}
      />

      <div className={styles.userInputForm}>
        <TextInput
          label={CONSTANT.users.nameLabel}
          value={name}
          onChange={setName}
          onlyLetters
          placeholder={CONSTANT.users.nameInputPlaceHolder}
          onErrorChange={setErrorExist}
        />
        <TextInput
          label={CONSTANT.users.surnameLabel}
          value={surname}
          onChange={setSurname}
          onlyLetters
          placeholder={CONSTANT.users.surNameLabelPlaceHolder}
          onErrorChange={setErrorExist}
        />
        <TextInput
          label={CONSTANT.users.emailLabel}
          value={email}
          onChange={setEmail}
          placeholder={CONSTANT.users.emailLabelPlaceHolder}
         
        />
        <div className={styles.formButton}>
          <Button onClick={handleSubmit}>
            {editingId !== null ? CONSTANT.button.update : CONSTANT.button.add}
          </Button>
        </div>
      </div>

      <ul className={styles.userList}>
        {users.map((u) => (
          <li key={u.id}>
            <div className={styles.userInfo}>
              <FaUserCircle className={styles.avatar} />
              <div>
                <h3>
                  {u.name} {u.surname}
                </h3>
                <p>
                  <FaEnvelope className={styles.mailIcon} /> {u.email}
                </p>
              </div>
            </div>
            <div className={styles.buttonDiv}>
              <Button onClick={() => handleEdit(u)}>
                <FaEdit className={styles.icon} /> {CONSTANT.button.update}
              </Button>
              <Button onClick={() => handleDelete(u.id)}>
                <FaTrash className={styles.icon} /> {CONSTANT.button.delete}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.userCountDiv}>
        <div className={styles.userCount}>
          {CONSTANT.users.totalUsers}: {users.length}
        </div>
      </div>
    </div>
  );
}
