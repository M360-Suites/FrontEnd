import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";

const ImportContactsModal = ({ onClose }) => {
  const [emails, setEmails] = useState(Array(5).fill(""));
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importMethod, setImportMethod] = useState("manual"); // "manual" or "file"
  const [emailErrors, setEmailErrors] = useState(Array(5).fill(""));
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle email input change
  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);

    // Clear error when typing
    const newErrors = [...emailErrors];
    newErrors[index] = "";
    setEmailErrors(newErrors);
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email === "" || re.test(String(email).toLowerCase());
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      handleFileUpload(file);
    } else {
      alert("Please upload a CSV file");
    }
  };

  // Handle file upload via input
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    // Here you would typically parse the CSV file
    // For this example, we'll just store the file object
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate emails before submitting
    if (importMethod === "manual") {
      const newErrors = emails.map(email => 
        email !== "" && !validateEmail(email) ? "Invalid email format" : ""
      );
      
      setEmailErrors(newErrors);
      
      if (newErrors.some(error => error !== "")) {
        return; // Don't submit if there are errors
      }
      
      // Filter out empty emails
      const validEmails = emails.filter(email => email !== "");
      
      if (validEmails.length === 0) {
        alert("Please enter at least one email address");
        return;
      }
      
      // Process valid emails
      console.log("Importing emails:", validEmails);
    } else {
      // Process uploaded file
      if (!uploadedFile) {
        alert("Please upload a CSV file");
        return;
      }
      
      console.log("Importing file:", uploadedFile);
      // Here you would typically send the file to your backend
    }
    
    // Close modal after successful submission
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          ref={modalRef}
          className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Import Contacts</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-4 sm:p-6">
            {/* Import Method Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  importMethod === "manual" 
                    ? "text-primary-orange border-b-2 border-primary-orange" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setImportMethod("manual")}
              >
                Enter Manually
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  importMethod === "file" 
                    ? "text-primary-orange border-b-2 border-primary-orange" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setImportMethod("file")}
              >
                Upload CSV
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {importMethod === "manual" ? (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm text-gray-600 mb-4">
                    Enter up to 5 email addresses below. For more than 5 contacts, please use the CSV upload option.
                  </p>
                  
                  <div className="space-y-3">
                    {emails.map((email, index) => (
                      <div key={index} className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => handleEmailChange(index, e.target.value)}
                          placeholder={`Email address ${index + 1}`}
                          className={`w-full px-3 py-2 border ${
                            emailErrors[index] ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange transition-colors`}
                        />
                        {emailErrors[index] && (
                          <p className="text-red-500 text-xs mt-1">{emailErrors[index]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      isDragging ? 'border-primary-orange bg-primary-orange/5' : 'border-gray-300'
                    } transition-colors`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <Icon 
                      icon={uploadedFile ? "mdi:file-check" : "mdi:cloud-upload"} 
                      className={`text-4xl mx-auto mb-2 ${
                        uploadedFile ? "text-green-500" : "text-gray-400"
                      }`} 
                    />
                    
                    {uploadedFile ? (
                      <div>
                        <p className="text-sm font-medium text-gray-700">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                        <button 
                          onClick={() => setUploadedFile(null)}
                          className="text-xs text-primary-orange hover:text-primary-orange/80 mt-2"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-gray-700">
                          Drag and drop your CSV file here
                        </p>
                        <p className="text-xs text-gray-500 mt-1 mb-3">
                          or
                        </p>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Browse Files
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <Icon icon="mdi:information" className="inline-block mr-1 text-blue-500" />
                      Your CSV file should have an "email" column and can contain up to 100 contacts.
                    </p>
                    <a 
                      href="#" 
                      className="text-sm text-primary-orange hover:underline mt-2 inline-block"
                      onClick={(e) => {
                        e.preventDefault();
                        // Here you would typically provide a sample CSV template
                        alert("Download sample CSV template");
                      }}
                    >
                      Download sample template
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-orange text-white rounded-md text-sm font-medium hover:bg-primary-orange/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Import Contacts
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImportContactsModal;
