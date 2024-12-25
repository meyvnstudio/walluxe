import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminFiles = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState("");
  const [fileDescr, setFileDescr] = useState("");
  const [fileSnapshot, setFileSnapshot] = useState(null);
  const [folders, setFolders] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const apiKey = "22704a4xzy4jmeqowy65u";
  const uploadUrl = "https://s1.myvideo.com/upload/01";

  // Fetch folders and file list on component mount
  useEffect(() => {
    fetchFolders();
    fetchFileList();
  }, []);

  // Fetch folders
  const fetchFolders = async () => {
    try {
      const response = await axios.get(
        `https://streamhgapi.com/api/folder/list?key=${apiKey}&fld_id=0&files=1`
      );
      setFolders(response.data.result.folders);
    } catch (error) {
      console.error("Error fetching folders", error);
    }
  };

  // Fetch file list
  const fetchFileList = async () => {
    try {
      const response = await axios.get(
        `https://streamhgapi.com/api/file/list?key=${apiKey}`
      );
      setFileList(response.data.result.files);
    } catch (error) {
      console.error("Error fetching files", error);
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("file", file);
    formData.append("file_title", fileTitle);
    formData.append("file_descr", fileDescr);
    if (fileSnapshot) {
      formData.append("snapshot", fileSnapshot);
    }

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Upload Successful!");
      fetchFileList(); // Refresh the file list
    } catch (error) {
      console.error("Error uploading file", error);
      setUploadStatus("Upload Failed");
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="files">
      <div className="tabs">
        <button onClick={() => handleTabChange("upload")}>Upload</button>
        <button onClick={() => handleTabChange("manage")}>Manage Files</button>
        <button onClick={() => handleTabChange("folders")}>
          Manage Folders
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="upload-tab">
          <h3>Upload Video</h3>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="video/*"
          />
          <input
            type="text"
            placeholder="Video Title"
            value={fileTitle}
            onChange={(e) => setFileTitle(e.target.value)}
          />
          <textarea
            placeholder="Video Description"
            value={fileDescr}
            onChange={(e) => setFileDescr(e.target.value)}
          ></textarea>
          <input
            type="file"
            onChange={(e) => setFileSnapshot(e.target.files[0])}
            accept="image/*"
          />
          <button onClick={handleFileUpload}>Upload</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      )}

      {activeTab === "manage" && (
        <div className="manage-tab">
          <h3>Manage Files</h3>
          <ul>
            {fileList.map((file) => (
              <li key={file.file_code}>
                <img src={file.thumbnail} alt={file.title} />
                <p>{file.title}</p>
                <a href={file.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
                <button>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "folders" && (
        <div className="folders-tab">
          <h3>Manage Folders</h3>
          <ul>
            {folders.map((folder) => (
              <li key={folder.fld_id}>
                <p>{folder.name}</p>
                <button>Edit</button>
                <button>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminFiles;
