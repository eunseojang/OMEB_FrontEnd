import { useState } from 'react';
import './ProfileModal.css';
import axios from 'axios';

const ProfileModal = ({ closeModal, token }) => {
  const [nickname, setNickname] = useState('김oo');

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

        // Upload file to S3 using presigned URL
        const uploadResponse = await axios.put(presignedUrl, file, {
          withCredentials: true,
          headers: { 'Content-Type': 'file.type' },
        });
        console.log('File uploaded to S3', uploadResponse);

        // Send the S3 URL to backend to save as profile image URL
        const s3Url = presignedUrl.split('?')[0];
        const profileUpdateResponse = await axios.patch(
          `${import.meta.env.VITE_TEST_URL}/api/v1/profile`,
          { url: s3Url },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log('Profile image URL updated:', profileUpdateResponse);

        alert('Profile image updated successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/profile`,
        { nickname },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
            <div className="profile-image-placeholder"></div>
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
