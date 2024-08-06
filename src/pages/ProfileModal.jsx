import { useState, useEffect, useRef } from "react";
import "./ProfileModal.css";
import axios from "axios";
import Cookies from "js-cookie";

const ProfileModal = ({ closeModal, userProfile }) => {
  const [nickname, setNickname] = useState("김oo");
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = Cookies.get("accessToken");

        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/user/my-page`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNickname(response.data.data.nickname);
        setImageUrl(response.data.data.profileImageUrl);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleFileUpload = async (event) => {
    const token = Cookies.get("accessToken");
    const file = event.target.files[0];

    if (file) {
      try {
        const presignedUrlResponse = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/presigned-url`,
          {
            params: { fileName: file.name },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const presignedUrl = presignedUrlResponse.data.data.url;

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
          const binary = reader.result;

          const uploadResponse = await axios.put(presignedUrl, binary, {
            headers: {
              "Content-Type": file.type,
            },
          });

          if (uploadResponse.status !== 200) {
            throw new Error("Failed to upload file to S3");
          }

          const s3Url = presignedUrl.split("?")[0];
          setImageUrl(s3Url);

          const response = await axios.patch(
            `${import.meta.env.VITE_TEST_URL}/api/v1/profile`,
            {},
            {
              params: { url: imageUrl },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status !== 200) {
            throw new Error("Failed to update profile");
          }

          // alert('File uploaded successfully');
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("파일 업로드 실패");
      }
    }
  };

  const handleSave = async () => {
    const token = Cookies.get("accessToken");
    try {
      const response2 = await axios.patch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/user`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("프로필을 저장했습니다.");
      userProfile();
      closeModal();
    } catch (error) {
      console.error("Profile update error:", error);
      alert("중복된 닉네임입니다.");
      closeModal();
    }
  };

  const handleDefaultProfile = async () => {
    const token = Cookies.get("accessToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/profile/default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to set default profile image");
      }

      alert("프로필을 저장했습니다.");
      userProfile();
      closeModal();
    } catch (error) {
      console.error("Error resetting profile image to default:", error);
      alert("프로필 업로드에 실패 했습니다.");
      closeModal();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-modal">
      <div className="modal-content">
        {/* 닫기 */}
        <span className="material-icons" onClick={closeModal}>
          close
        </span>

        <div className="modal-body">
          <div className="profile-image-upload">
            <div className="profile-image-placeholder">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" />
              ) : (
                <div>No Profile Image</div>
              )}
            </div>
            <span className="material-icons" onClick={triggerFileInput}>
              photo_camera
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>

          <div className="input-group">
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button className="default-img" onClick={handleDefaultProfile}>
              기본 프로필
            </button>
            <button className="save-button" onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
