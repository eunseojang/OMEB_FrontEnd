import { useState } from 'react';
import './ProfileModal.css';
import axios from 'axios';

const ProfileModal = ({ closeModal, token }) => {
  const [nickname, setNickname] = useState('김oo');
  const [ImageUrl, setImageUrl] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        console.log('Selected file:', file);

        // Request presigned URL from backend
        const presignedUrlResponse = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/presigned-url`,
          {
            params: { fileName: file.name },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log('Presigned URL Response:', presignedUrlResponse.data);

        const presignedUrl = presignedUrlResponse.data.data.url;
        console.log('Presigned URL:', presignedUrl);

        // Convert file to binary
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
          const binary = reader.result;

          // presigned url을 이용해서 3s에 이미지 업로드
          const uploadResponse = await axios.put(presignedUrl, binary);

          if (uploadResponse.status !== 200) {
            throw new Error('Failed to upload file to S3');
          }
          console.log('File uploaded to S3', uploadResponse);

          // 백엔드한테 이미지 url 보내기
          const s3Url = presignedUrl.split('?')[0];
          console.log(s3Url);
          setImageUrl(s3Url);

          const profileUpdateResponse = await axios.patch(
            `${import.meta.env.VITE_TEST_URL}/api/v1/profile`,
            {},
            {
              params: { url: s3Url },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(profileUpdateResponse);

          if (profileUpdateResponse.status !== 200) {
            throw new Error('Failed to update profile image URL');
          }

          console.log('Profile image URL updated:', profileUpdateResponse);
          alert('Profile image updated successfully');
        };
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/profile`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully');
      closeModal();
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Profile update failed');
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
              {ImageUrl && <img src={ImageUrl} alt="Profile" />}
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
            <button className="default-img" onClick={closeModal}>
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
