import { useEffect, useState } from "react";
import styles from "./posts.module.css";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  Post,
} from "../utils/postFetch";
import { fetchUsers, User } from "../utils/userFetch";
import { CONSTANT } from "../constants/Constant";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import CustomDropdown from "../components/CustomDropdown";
import ButtonGroup from "../components/ButtonGroup";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorExist, setErrorExist] = useState(false);
  const { darkMode } = useTheme();
  const [phase, setPhase] = useState<"phase1" | "phase2">("phase1");

  const loadPosts = async () => {
    try {
      const data = await fetchPosts(phase);
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await fetchUsers(phase);
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, [phase]);

  const handleSubmit = async () => {
    if (errorExist || !userId) return;
    const payload = { title, userId };

    try {
      if (editingId) {
        if (phase === "phase1") {
          setPosts((prev) =>
            prev.map((post) =>
              post.id === editingId ? { ...post, ...payload } : post
            )
          );
        } else {
          await updatePost(phase, editingId, payload);
          await loadPosts();
        }
      } else {
        const response = await addPost(phase, payload);
        if (phase === "phase1") {
          setPosts((prev) => [...prev, response]);
        } else {
          await loadPosts();
        }
      }
    } catch (err) {
      console.error(err);
    }

    setEditingId(null);
    setTitle("");
    setUserId(0);
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setUserId(post.userId);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(phase, id);

      if (phase === "phase1") {
        setPosts((prev) => prev.filter((u) => u.id !== id));
      } else {
        await loadPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.postForm} ${darkMode ? styles.darkCard : ""}`}>
      <Header title="Posts" />

      <ButtonGroup
        firstButtonLabel="Phase 1"
        secondButtonLabel="Phase 2"
        firstClickEvent={() => setPhase("phase1")}
        secondClickEvent={() => setPhase("phase2")}
      />

      <div className={styles.userInputForm}>
        <TextInput
          label={CONSTANT.posts.title}
          value={title}
          onChange={setTitle}
          onlyLetters={true}
          placeholder={CONSTANT.posts.titleLabelPlaceHolder}
          onErrorChange={setErrorExist}
        />

        <div className={styles.formGroup}>
          <label>{CONSTANT.posts.user}</label>
          <CustomDropdown
            options={[
              { value: 0, label: CONSTANT.posts.selectUserLabel },
              ...users.map((u) => ({ value: u.id, label: u.name })),
            ]}
            value={userId}
            onChange={(val) => setUserId(Number(val))}
            placeholder={CONSTANT.posts.selectUserLabel}
          />
        </div>

        <div className={styles.formButton}>
          <Button onClick={handleSubmit}>
            {editingId ? CONSTANT.button.update : CONSTANT.button.add}
          </Button>
        </div>
      </div>

      <ul className={styles.postList}>
        {posts.map((p) => (
          <li key={p.id}>
            <div className={styles.postListDiv}>
              <span className={styles.postTitle}>{p.title}</span>
              <span className={styles.postBadge}>
                {users.find((u) => u.id === p.userId)?.name || p.userId}
              </span>
            </div>

            <div className={styles.buttonDiv}>
              <Button onClick={() => handleEdit(p)}>
                {CONSTANT.button.update}
              </Button>
              <Button onClick={() => handleDelete(p.id)}>
                {CONSTANT.button.delete}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.postCountDiv}>
        <div className={styles.postCount}>
          {CONSTANT.posts.totalPost}: {posts.length}
        </div>
      </div>
    </div>
  );
}
