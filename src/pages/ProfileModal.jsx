import './ProfileModal.css';

const profileModal = ({ closeModal }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploaded file:', file);
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
            <input type="text" defaultValue="김oo" />
          </div>
          <div className="input-group">
            <label>이메일</label>
            <input type="email" defaultValue="ooooo@naver.com" />
          </div>
          <div className="input-group">
            <label>다른 정보</label>
            <input type="text" />
          </div>
          <div className="modal-actions">
            <button className="cancel-button" onClick={closeModal}>
              취소
            </button>
            <button className="save-button">저장</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profileModal;
