import { useState, useEffect } from 'react';
import './ProfileModal.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProfileModal = ({ closeModal, userProfile }) => {
  const [nickname, setNickname] = useState('김oo');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = Cookies.get('accessToken');

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
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleFileUpload = async (event) => {
    const token = Cookies.get('accessToken');
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

        // 바이너리 파일로
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
          const binary = reader.result;

          // presigned url을 이용해서 s3에 이미지 업로드
          const uploadResponse = await axios.put(presignedUrl, binary, {
            headers: {
              'Content-Type': file.type,
            },
          });

          if (uploadResponse.status !== 200) {
            throw new Error('Failed to upload file to S3');
          }

          // S3 URL을 추출하고 state 업데이트
          const s3Url = presignedUrl.split('?')[0];
          setImageUrl(s3Url);

          // 성공적으로 업로드된 경우, 사용자에게 알림
          alert('File uploaded successfully');
        };
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
      }
    }
  };

  const handleSave = async () => {
    const token = Cookies.get('accessToken');
    try {
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
        throw new Error('Failed to update profile');
      }
      const response2 = await axios.patch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/user`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Profile updated successfully');
      userProfile();
      closeModal(); // Close modal after successful save
    } catch (error) {
      console.error('Profile update error:', error);
      alert('중복된 닉네입입니다.');
      closeModal();
    }
  };

  const handleDefaultProfile = async () => {
    const token = Cookies.get('accessToken');
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
        throw new Error('Failed to set default profile image');
      }

      alert('Profile updated successfully');
      userProfile();
      closeModal();
    } catch (error) {
      console.error('Error resetting profile image to default:', error);
      alert('Failed to reset profile image to default');
      closeModal();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <div className="modal-body">
          <div className="profile-image-upload">
            <div className="profile-image-placeholder">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" />
              ) : (
                <div>No Profile Image</div>
              )}
            </div>
            <label className="upload-button">
              사진 업로드
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
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
