

import React, { useEffect, useRef, useState } from 'react';
import { FaChartBar, FaProjectDiagram, FaUserFriends, FaServer, FaFileInvoiceDollar, FaTicketAlt, FaCog, FaBars, FaTimes, FaBlog } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { getDocs, collection, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject, getStorage } from "firebase/storage";
import { db,storage } from '@/Firebase/config';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import dynamic from 'next/dynamic';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dynamically import JoditEditor only on the client side
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false, // Disable server-side rendering for this component
});


const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Overview');
  const [isFormOpen, setFormOpen] = useState(false);
  const [logos, setLogos] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoName, setLogoName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingLogoId, setEditingLogoId] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(''); // Holds file name for display
  const [isBannerFormOpen, setBannerFormOpen] = useState(false);
  const [bannerIsEditing, setBannerIsEditing] = useState(false);
  const [bannerLink, setBannerLink] = useState('');
  const [category, setCategory] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [banners, setBanners] = useState([]);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [isSliderFormOpen, setSliderFormOpen] = useState(false);
  const [sliderIsEditing, setSliderIsEditing] = useState(false);
  const [sliderLink, setSliderLink] = useState('');
  const [sliderFile, setSliderFile] = useState(null);
  const [sliderPreview, setSliderPreview] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [sliderEditingBannerId, setSliderEditingBannerId] = useState(null);
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(''); // For image preview
  const [date, setDate] = useState('');
  const [detailPageContent, setDetailPageContent] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teamimage, setTeamImage] = useState(null);
  const [teamimagePreview, setTeamImagePreview] = useState(''); // For image preview
  const [role, setRole] = useState('');
  
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamEditId, setTeamEditId] = useState(null);
  const [teamIsOpen, setTeamIsOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientReview, setClientReview] = useState('');
  const [clientImage, setClientImage] = useState(null);
  const [clientImagePreview, setClientImagePreview] = useState(''); // For image preview
  const [clientRating, setClientRating] = useState(0); // Change to number for rating
  const [clients, setClients] = useState([]);
  const [clientEditId, setClientEditId] = useState(null);
  const [clientIsOpen, setClientIsOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobs, setJobs] = useState([]);
  const [jobEditId, setJobEditId] = useState(null);
  const [jobIsOpen, setJobIsOpen] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [projectImagePreview, setProjectImagePreview] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projects, setProjects] = useState([]);
  const [projectEditId, setProjectEditId] = useState(null);
  const [projectIsOpen, setProjectIsOpen] = useState(false);

  const [companyImage, setCompanyImage] = useState(null);
  const [companyImageUrl, setCompanyImageUrl] = useState('');
  const [companyLink, setCompanyLink] = useState('');
  const [companies, setCompanies] = useState([]);
  const [companyEditId, setCompanyEditId] = useState(null);
  const [companyIsOpen, setCompanyIsOpen] = useState(false);
  const [companyImagePreview, setCompanyImagePreview] = useState('');

  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [totalClients, setTotalClients] = useState('');
  const [completedProjects, setCompletedProjects] = useState('');
  const [pendingProjects, setPendingProjects] = useState('');
  const [happyClients, setHappyClients] = useState('');
  const [revenueGenerated, setRevenueGenerated] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [achievementEditId, setAchievementEditId] = useState(null);
  const [achievementIsOpen, setAchievementIsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catPrefixMainCategory, setCatPrefixMainCategory] = useState('');
  const [catPrefixSubCategories, setCatPrefixSubCategories] = useState([
    { name: '', description: '', image: null, imageUrl: '' },
    { name: '', description: '', image: null, imageUrl: '' },
    { name: '', description: '', image: null, imageUrl: '' },
    { name: '', description: '', image: null, imageUrl: '' },
  ]);
  const [categoryData, setCategoryData] = useState({ id: '', image: null, imageUrl: '' });
  
  // Fetch categories from Firestore
  const fetchCategories = async () => {
    try {
      const categoryRef = collection(db, 'pagecategories');
      const categorySnapshot = await getDocs(categoryRef);
      const categoryList = categorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories: ', error);
      toast.error('Failed to fetch categories. Please try again.');
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  // Handle image selection for the subcategories
  const handleSubCategoryImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedSubCategories = [...catPrefixSubCategories];
      updatedSubCategories[index] = { ...updatedSubCategories[index], image: file };
      setCatPrefixSubCategories(updatedSubCategories);
    }
  };
  
  // Handle category input changes
  const handlepageInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('subCategory')) {
      const index = parseInt(name.split('_')[1], 10);
      const updatedSubCategories = [...catPrefixSubCategories];
      updatedSubCategories[index] = { ...updatedSubCategories[index], name: value };
      setCatPrefixSubCategories(updatedSubCategories);
    } else if (name.startsWith('subDescription')) {
      const index = parseInt(name.split('_')[1], 10);
      const updatedSubCategories = [...catPrefixSubCategories];
      updatedSubCategories[index] = { ...updatedSubCategories[index], description: value };
      setCatPrefixSubCategories(updatedSubCategories);
    } else {
      setCatPrefixMainCategory(value);
    }
  };
  
  // Handle category form submission
  const handlepageCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const subCategoriesData = [];
      for (const subCategory of catPrefixSubCategories) {
        let imageUrl = '';
        // Upload image if selected
        if (subCategory.image) {
          const storage = getStorage();
          const storageRef = ref(storage, `images/${subCategory.image.name}`);
          await uploadBytes(storageRef, subCategory.image);
          imageUrl = await getDownloadURL(storageRef);
        } else {
          // Keep existing image URL if no new image is selected
          imageUrl = subCategory.imageUrl || '';
        }
        subCategoriesData.push({
          name: subCategory.name,
          description: subCategory.description,
          imageUrl: imageUrl,
        });
      }
  
      if (categoryData.id) {
        // Update existing category
        await updateDoc(doc(db, 'pagecategories', categoryData.id), {
          mainCategory: catPrefixMainCategory,
          subCategories: subCategoriesData,
        });
        toast.success('Category updated successfully!');
      } else {
        // Save new category
        await addDoc(collection(db, 'pagecategories'), {
          mainCategory: catPrefixMainCategory,
          subCategories: subCategoriesData,
        });
        toast.success('Category added successfully!');
      }
  
      resetpageForm();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category: ', error);
      toast.error('Failed to save category. Please try again.');
    }
  };
  
  // Reset the form
  const resetpageForm = () => {
    setCatPrefixMainCategory('');
    setCatPrefixSubCategories([
      { name: '', description: '', image: null, imageUrl: '' },
      { name: '', description: '', image: null, imageUrl: '' },
      { name: '', description: '', image: null, imageUrl: '' },
      { name: '', description: '', image: null, imageUrl: '' },
    ]);
    setCategoryIsOpen(false);
  };
  
  // Handle category edit
  const handlepageEdit = (category) => {
    setCategoryIsOpen(true);
    setCatPrefixMainCategory(category.mainCategory);
    setCatPrefixSubCategories(category.subCategories.map((sub) => ({
      name: sub.name,
      description: sub.description,
      id: category.id,
      imageUrl: sub.imageUrl // Adjust to match structure
    })));
    setCategoryData({ id: category.id });
  };
  
  // Handle category delete
  const handlepageDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'pagecategories', id));
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category: ', error);
      toast.error('Failed to delete category. Please try again.');
    }
  };
  

  // Fetch contacts from Firestore
  const fetchContacts = async () => {
    const querySnapshot = await getDocs(collection(db, 'contacts'));
    const contactsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setContacts(contactsData);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact
  const handlecontactDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const contactDocRef = doc(db, 'contacts', id);
      await deleteDoc(contactDocRef);
      fetchContacts(); // Refresh the table after deletion
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const achievementRef = collection(db, 'achievements');
      const achievementSnapshot = await getDocs(achievementRef);
      const achievementList = achievementSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAchievements(achievementList);
    } catch (error) {
      console.error('Error fetching achievements: ', error);
      toast.error('Failed to fetch achievements. Please try again.');
    }
  };

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();
    try {
      if (achievementEditId) {
        const achievementDocRef = doc(db, 'achievements', achievementEditId);
        await updateDoc(achievementDocRef, {
          yearsOfExperience,
          totalClients,
          completedProjects,
          pendingProjects,
          happyClients,
          revenueGenerated,
        });
        toast.success('Achievement updated successfully!');
      } else {
        const achievementRef = collection(db, 'achievements');
        await addDoc(achievementRef, {
          yearsOfExperience,
          totalClients,
          completedProjects,
          pendingProjects,
          happyClients,
          revenueGenerated,
        });
        toast.success('Achievement added successfully!');
      }

      // Reset the form
      resetForm();
      fetchAchievements(); // Fetch updated achievements
    } catch (error) {
      console.error('Error adding/updating achievement: ', error);
      toast.error('Failed to add/update achievement. Please try again.');
    }
  };

  const resetForm = () => {
    setYearsOfExperience('');
    setTotalClients('');
    setCompletedProjects('');
    setPendingProjects('');
    setHappyClients('');
    setRevenueGenerated('');
    setAchievementEditId(null);
    setAchievementIsOpen(false);
  };

  const calculateTotals = (achievementList) => {
    let totalClientsCount = 0;
    let completedProjectsCount = 0;
    let pendingProjectsCount = 0;
    let happyClientsCount = 0;
    let revenueCount = 0;

    achievementList.forEach((achievement) => {
      totalClientsCount += achievement.totalClients || 0;
      completedProjectsCount += achievement.completedProjects || 0;
      pendingProjectsCount += achievement.pendingProjects || 0;
      happyClientsCount += achievement.happyClients || 0;
      revenueCount += achievement.revenueGenerated || 0;
    });

    setTotalClients(totalClientsCount);
    setCompletedProjects(completedProjectsCount);
    setPendingProjects(pendingProjectsCount);
    setHappyClients(happyClientsCount);
    setRevenueGenerated(revenueCount);
  };

  const handleAchievementEdit = (achievement) => {
    setYearsOfExperience(achievement.yearsOfExperience);
    setTotalClients(achievement.totalClients);
    setCompletedProjects(achievement.completedProjects);
    setPendingProjects(achievement.pendingProjects);
    setHappyClients(achievement.happyClients);
    setRevenueGenerated(achievement.revenueGenerated);
    setAchievementEditId(achievement.id);
    setAchievementIsOpen(true);
  };

  const handleAchievementDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'achievements', id));
      toast.success('Achievement deleted successfully!');
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting achievement: ', error);
      toast.error('Failed to delete achievement. Please try again.');
    }
  };     

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Fetch existing companies from Firestore
  const fetchCompanies = async () => {
    try {
      const companyRef = collection(db, 'companies');
      const companySnapshot = await getDocs(companyRef);
      const companyList = companySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCompanies(companyList);
    } catch (error) {
      console.error('Error fetching companies: ', error);
      toast.error('Failed to fetch companies. Please try again.');
    }
  };

  // Handle image selection and preview
  const handleCompanyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyImage(file);
      setCompanyImagePreview(URL.createObjectURL(file)); // Set preview URL for image preview
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = companyImageUrl;

      // If a new image is uploaded, handle the upload process
      if (companyImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `companies/${companyImage.name}`);
        await uploadBytes(storageRef, companyImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      // If editing, update the company; otherwise, add a new one
      if (companyEditId) {
        const companyDocRef = doc(db, 'companies', companyEditId);
        await updateDoc(companyDocRef, {
          logoUrl: imageUrl,
          link: companyLink,
        });
        toast.success('Company updated successfully!');
      } else {
        const companyRef = collection(db, 'companies');
        await addDoc(companyRef, {
          logoUrl: imageUrl,
          link: companyLink,
        });
        toast.success('Company added successfully!');
      }

      // Reset the form and fetch updated companies
      resetForm();
      fetchCompanies();
    } catch (error) {
      console.error('Error adding/updating company: ', error);
      toast.error('Failed to add/update company. Please try again.');
    }
  };

  const handleCompanyEdit = (company) => {
    setCompanyImageUrl(company.logoUrl);
    setCompanyLink(company.link);
    setCompanyEditId(company.id);
    setCompanyImagePreview(company.logoUrl); // Show the existing logo in the preview
    setCompanyIsOpen(true);
  };

  const handleCompanyDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'companies', id));
      toast.success('Company deleted successfully!');
      fetchCompanies(); // Fetch updated companies after deletion
    } catch (error) {
      console.error('Error deleting company: ', error);
      toast.error('Failed to delete company. Please try again.');
    }
  };

  const resetachieveForm = () => {
    setCompanyImage(null);
    setCompanyImageUrl('');
    setCompanyLink('');
    setCompanyEditId(null);
    setCompanyImagePreview('');
    setCompanyIsOpen(false);
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectRef = collection(db, 'projects');
      const projectSnapshot = await getDocs(projectRef);
      const projectList = projectSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(projectList);
    } catch (error) {
      console.error('Error fetching projects: ', error);
      toast.error('Failed to fetch projects. Please try again.');
    }
  };

  const handleProjectImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectImage(file);
      setProjectImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (projectImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `projects/${projectImage.name}`);
        await uploadBytes(storageRef, projectImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      if (projectEditId) {
        const projectDocRef = doc(db, 'projects', projectEditId);
        await updateDoc(projectDocRef, {
          name: projectName,
          imageUrl,
          description: projectDescription,
          category: projectCategory,
          link: projectLink,
        });
        toast.success('Project updated successfully!');
      } else {
        const projectRef = collection(db, 'projects');
        await addDoc(projectRef, {
          name: projectName,
          imageUrl,
          description: projectDescription,
          category: projectCategory,
          link: projectLink,
        });
        toast.success('Project added successfully!');
      }

      // Reset the form
      setProjectName('');
      setProjectImage(null);
      setProjectImagePreview('');
      setProjectDescription('');
      setProjectLink('');
      setProjectCategory('');
      setProjectEditId(null);
      setProjectIsOpen(false);
      fetchProjects(); // Fetch updated projects
    } catch (error) {
      console.error('Error adding/updating project: ', error);
      toast.error('Failed to add/update project. Please try again.');
    }
  };

  const handleProjectEdit = (project) => {
    setProjectName(project.name);
    setProjectImagePreview(project.imageUrl);
    setProjectDescription(project.description);
    setProjectLink(project.link);
    setProjectCategory(project.category);
    setProjectEditId(project.id);
    setProjectIsOpen(true);
  };

  const handleProjectDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project: ', error);
      toast.error('Failed to delete project. Please try again.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const jobRef = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobRef);
      const jobList = jobSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    } catch (error) {
      console.error('Error fetching jobs: ', error);
      toast.error('Failed to fetch jobs. Please try again.');
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      if (jobEditId) {
        const jobDocRef = doc(db, 'jobs', jobEditId);
        await updateDoc(jobDocRef, {
          title: jobTitle,
          location: jobLocation,
          description: jobDescription,
        });
        toast.success('Job updated successfully!');
      } else {
        const jobRef = collection(db, 'jobs');
        await addDoc(jobRef, {
          title: jobTitle,
          location: jobLocation,
          description: jobDescription,
        });
        toast.success('Job added successfully!');
      }

      // Reset the form
      setJobTitle('');
      setJobLocation('');
      setJobDescription('');
      setJobEditId(null);
      setJobIsOpen(false);
      fetchJobs(); // Fetch updated jobs
    } catch (error) {
      console.error('Error adding/updating job: ', error);
      toast.error('Failed to add/update job. Please try again.');
    }
  };

  const handleJobEdit = (job) => {
    setJobTitle(job.title);
    setJobLocation(job.location);
    setJobDescription(job.description);
    setJobEditId(job.id);
    setJobIsOpen(true); // Open modal for editing
  };

  const handleJobDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'jobs', id));
      toast.success('Job deleted successfully!');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job: ', error);
      toast.error('Failed to delete job. Please try again.');
    }
  };
  
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  useEffect(() => {
    fetchClients();
  }, []);
  
  const fetchClients = async () => {
    try {
      const clientRef = collection(db, 'reviews');
      const clientSnapshot = await getDocs(clientRef);
      const clientList = clientSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClients(clientList);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
      toast.error('Failed to fetch reviews. Please try again.');
    }
  };
  
  const handleClientImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClientImage(file);
      setClientImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };
  
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (clientImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `client/${clientImage.name}`);
        await uploadBytes(storageRef, clientImage);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      if (clientEditId) {
        const clientDocRef = doc(db, 'reviews', clientEditId);
        await updateDoc(clientDocRef, {
          name: clientName,
          imageUrl,
          description: clientReview,
          rating: clientRating, // Add the rating
        });
        toast.success('Client updated successfully!');
      } else {
        const clientRef = collection(db, 'reviews');
        await addDoc(clientRef, {
          name: clientName,
          imageUrl,
          description: clientReview,
          rating: clientRating, // Add the rating
        });
        toast.success('Client added successfully!');
      }
  
      // Reset the form
      setClientName('');
      setClientImage(null);
      setClientImagePreview(''); // Reset image preview
      setClientReview('');
      setClientRating(0); // Reset rating
      setClientEditId(null);
      setClientIsOpen(false); // Closing the modal
      fetchClients(); // Fetch updated clients
    } catch (error) {
      console.error('Error adding/updating client: ', error);
      toast.error('Failed to add/update client. Please try again.');
    }
  };
  
  const handleClientEdit = (client) => {
    setClientName(client.name);
    setClientImagePreview(client.imageUrl); // Display image preview for editing
    setClientReview(client.description);
    setClientRating(client.rating); // Set the rating for editing
    setClientEditId(client.id);
    setClientIsOpen(true); // Opening the modal for editing
  };
  
  const handleClientDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
      toast.success('Client deleted successfully!');
      fetchClients();
    } catch (error) {
      console.error('Error deleting client: ', error);
      toast.error('Failed to delete client. Please try again.');
    }
  };
  
  
  useEffect(() => {
    fetchTeam();
  }, []);
  
  const fetchTeam = async () => {
    try {
      const teamRef = collection(db, 'ourteam');
      const teamsSnapshot = await getDocs(teamRef);
      const teamList = teamsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeamMembers(teamList); // Corrected from setBlogs to setTeamMembers
    } catch (error) {
      console.error('Error fetching team: ', error);
      toast.error('Failed to fetch team. Please try again.');
    }
  };
  const handleTeamImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeamImage(file);
      setTeamImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };
  
  
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (teamimage) {
        const storage = getStorage();
        const storageRef = ref(storage, `team/${teamimage.name}`);
        await uploadBytes(storageRef, teamimage);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      if (teamEditId) { // Changed from editId to teamEditId
        const teamDocRef = doc(db, 'ourteam', teamEditId);
        await updateDoc(teamDocRef, {
          name,
          role,
          imageUrl,
          description,
        });
        toast.success('Team updated successfully!');
      } else {
        const teamRef = collection(db, 'ourteam');
        await addDoc(teamRef, {
          name,
          role,
          imageUrl,
          description,
        });
        toast.success('Team added successfully!');
      }
  
      // Reset the form
      setName('');
      setRole('');
      setTeamImage(null);
      setTeamImagePreview(''); // Reset image preview
      setDescription('');
      setTeamEditId(null);
      setTeamIsOpen(false); // Closing the modal
      fetchTeam();
    } catch (error) {
      console.error('Error adding/updating team: ', error);
      toast.error('Failed to add/update team. Please try again.');
    }
  };
  
  const handleTeamEdit = (team) => {
    setName(team.name);
    setRole(team.role);
    setTeamImagePreview(team.imageUrl); // Display image preview for editing
    setDescription(team.description);
    
    setTeamEditId(team.id);
    setTeamIsOpen(true); // Opening the modal for editing
  };
  
  const handleTeamDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'ourteam', id));
      toast.success('Team deleted successfully!');
      fetchTeam();
    } catch (error) {
      console.error('Error deleting team: ', error);
      toast.error('Failed to delete team. Please try again.');
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsRef = collection(db, 'blogs');
      const blogsSnapshot = await getDocs(blogsRef);
      const blogsList = blogsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsList);
    } catch (error) {
      console.error('Error fetching blogs: ', error);
      toast.error('Failed to fetch blogs. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `banners/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      if (editId) {
        const blogDocRef = doc(db, 'blogs', editId);
        await updateDoc(blogDocRef, {
          title,
          content,
          imageUrl,
          date: new Date(date),
          createdAt: new Date(),
          detailPageContent,
        });
        toast.success('Blog updated successfully!');
      } else {
        const blogRef = collection(db, 'blogs');
        await addDoc(blogRef, {
          title,
          content,
          imageUrl,
          date: new Date(date),
          createdAt: new Date(),
          detailPageContent,
        });
        toast.success('Blog added successfully!');
      }

      // Reset the form
      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview(''); // Reset image preview
      setDate('');
      setDetailPageContent('');
      setEditId(null);
      setIsOpen(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error adding/updating blog: ', error);
      toast.error('Failed to add/update blog. Please try again.');
    }
  };

  const handleBlogEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setImagePreview(blog.imageUrl); // Display image preview for editing
    setDate(blog.date.toDate().toISOString().split('T')[0]);
    setDetailPageContent(blog.detailPageContent);
    setEditId(blog.id);
    setIsOpen(true);
  };

  const handleBlogDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog: ', error);
      toast.error('Failed to delete blog. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Image preview logic
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };
  useEffect(() => {
    const fetchSliders = async () => {
      const querySnapshot = await getDocs(collection(db, 'slider'));
      const slidersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSliders(slidersData); // Corrected this to setSliders
    };
    fetchSliders();
  }, []);
  
  // Handle file selection for sliders
  const handleSliderChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSliderFile(file);
      setSliderPreview(URL.createObjectURL(file)); // Preview the selected slider image
    }
  };
  
  // Handle adding/updating sliders
  const handleSliderUpload = async () => {
    if (!sliderFile) return;
  
    // Upload slider file to Firebase Storage
    const storageRef = ref(storage, `sliders/${sliderFile.name}`);
    await uploadBytes(storageRef, sliderFile);
  
    // Get the download URL of the uploaded file
    const fileUrl = await getDownloadURL(storageRef);
  
    if (sliderIsEditing) {
      // Update an existing slider in Firestore
      const sliderDocRef = doc(db, 'slider', sliderEditingBannerId);
      await updateDoc(sliderDocRef, {
        link: sliderLink,
        url: fileUrl,
      });
    } else {
      // Add a new slider to Firestore
      await addDoc(collection(db, 'slider'), {
        link: sliderLink,
        url: fileUrl,
      });
    }
  
    // Reset form fields and close form
    resetSliderForm();
  };
  
  // Handle editing a slider
  const handleSliderEdit = (id, link, url) => {
    setSliderIsEditing(true);
    setSliderEditingBannerId(id);
    setSliderLink(link);
    setSliderPreview(url);
    setSliderFormOpen(true);
  };
  
  // Handle deleting a slider
  const handleSliderDelete = async (id) => {
    await deleteDoc(doc(db, 'slider', id));
    setSliders(sliders.filter(slider => slider.id !== id));
  };
  
  // Reset form fields
  const resetSliderForm = () => {
    setSliderIsEditing(false);
    setSliderEditingBannerId(null);
    setSliderLink('');
    setSliderFile(null);
    setSliderPreview(null);
    setSliderFormOpen(false);
  };
  // Fetch banners from Firestore
  useEffect(() => {
    const fetchBanners = async () => {
      const querySnapshot = await getDocs(collection(db, 'banners'));
      const bannersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBanners(bannersData);
    };
    fetchBanners();
  }, []);

  // Handle file selection for banners
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file)); // Preview the selected banner image
    }
  };

  // Handle adding/updating banners
  const handleBannerUpload = async () => {
    if (!bannerFile) return;

    // Upload banner file to Firebase Storage
    const storageRef = ref(storage, `banners/${bannerFile.name}`);
    await uploadBytes(storageRef, bannerFile);

    // Get the download URL of the uploaded file
    const fileUrl = await getDownloadURL(storageRef);

    if (bannerIsEditing) {
      // Update an existing banner in Firestore
      const bannerDocRef = doc(db, 'banners', editingBannerId);
      await updateDoc(bannerDocRef, {
        link: bannerLink,
        category: category,
        url: fileUrl,
      });
    } else {
      // Add a new banner to Firestore
      await addDoc(collection(db, 'banners'), {
        link: bannerLink,
        category: category,
        url: fileUrl,
      });
    }

    // Reset form fields and close form
    resetBannerForm();
    // Refresh banners after upload/update
  };

  // Handle editing a banner
  const handleBannerEdit = (id, link, url, category) => {
    setBannerIsEditing(true);
    setEditingBannerId(id);
    setBannerLink(link);
    setBannerFile(url),
    setBannerPreview(url);
    setCategory(category);
    setBannerFormOpen(true);
  };

  // Handle deleting a banner
  const handleBannerDelete = async (id) => {
    await deleteDoc(doc(db, 'banners', id));
    setBanners(banners.filter(banner => banner.id !== id));
  };

  // Reset form fields
  const resetBannerForm = () => {
    setBannerIsEditing(false);
    setEditingBannerId(null);
    setBannerLink('');
    setCategory('');
    setBannerFile(null);
    setBannerPreview(null);
    setBannerFormOpen(false);
  };


  useEffect(() => {
    const fetchLogos = async () => {
      const querySnapshot = await getDocs(collection(db, 'logos'));
      const logosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogos(logosData);
    };
    fetchLogos();
  }, []);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file); // Set the selected banner file
      setLogoPreview(URL.createObjectURL(file)); // Preview the selected file
      setSelectedFileName(file.name); // Set the file name to display
    }
  };

  // Handle logo upload (either adding new or editing existing)
  const handleLogoUpload = async () => {
    if (!logoFile) return;

    const storageRef = ref(storage, `logos/${logoFile.name}`);
    await uploadBytes(storageRef, logoFile); // Upload file to Firebase Storage
    const logoUrl = await getDownloadURL(storageRef); // Get the download URL for the uploaded file

    if (isEditing) {
      // Edit existing logo
      const logoDoc = doc(db, 'logos', editingLogoId);
      await updateDoc(logoDoc, { name: logoName, url: logoUrl });
      setIsEditing(false);
      setEditingLogoId(null);
    } else {
      // Add new logo
      await addDoc(collection(db, 'logos'), { name: logoName, url: logoUrl });
    }

    // Refresh logos after upload
    const querySnapshot = await getDocs(collection(db, 'logos'));
    const logosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLogos(logosData);

    // Reset form and close modal
    setLogoFile(null);
    setLogoName('');
    setLogoPreview(null);
    setSelectedFileName(''); // Clear the file name display
    setFormOpen(false);
  };

  // Handle logo delete
  const handleDelete = async (id, logoUrl) => {
    const logoDoc = doc(db, 'logos', id);
    await deleteDoc(logoDoc); // Delete Firestore document

    const storageRef = ref(storage, logoUrl);
    await deleteObject(storageRef); // Delete file from Firebase Storage

    setLogos(logos.filter(logo => logo.id !== id));
  };

  // Handle edit logo
  const handleEdit = (id, name, url) => {
    setIsEditing(true);
    setEditingLogoId(id);
    setLogoName(name);
    setLogoPreview(url); // Preview the current logo
    setSelectedFileName(name); // Show the current logo name in the "File name" display
    setFormOpen(true);
  };

  // Handle logo upload
  
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setSidebarOpen(false); // Close sidebar on mobile view after selection
  };

  // Sample Chart Data for Overview
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Projects Completed',
        data: [15, 23, 12, 22, 30],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Revenue Generated',
        data: [12000, 19000, 30000, 50000, 26000],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="p-4 text-white bg-pink-700">
        <div className="flex items-center justify-between lg:justify-center md:justify-center">
          <h1 className="text-xl font-bold"> Admin Dashboard</h1>
          {/* Mobile Sidebar Toggle Button */}
          <button
            className="text-white md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block w-64 bg-pink-400 p-4 text-white md:h-auto flex-shrink-0 transition-transform transform duration-300 ease-in-out md:translate-x-0 z-10`}
        >
          <ul>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('Overview')}>
              <FaChartBar className="inline-block mr-2" />
              <span>Overview</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('achievements')}>
              <FaProjectDiagram className="inline-block mr-2" />
              <span>Achievements</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('Projects')}>
              <FaProjectDiagram className="inline-block mr-2" />
              <span>Projects</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('Clients')}>
              <FaUserFriends className="inline-block mr-2" />
              <span>Clients</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('Career')}>
              <FaUserFriends className="inline-block mr-2" />
              <span>Career</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('TeamMembers')}>
              <FaUserFriends className="inline-block mr-2" />
              <span>Team Members</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('ServerMonitoring')}>
              <FaBlog className="inline-block mr-2" />
              <span>Website Logo</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('SupportTickets')}>
              <FaTicketAlt className="inline-block mr-2" />
              <span>Banners</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('FinancialReports')}>
              <TfiLayoutSliderAlt className="inline-block mr-2" />
              <span>Hero Slider</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('Settings')}>
              <FaCog className="inline-block mr-2" />
              <span>Blog</span>
            </li>
            <li className="mb-4 font-bold cursor-pointer" onClick={() => handleComponentChange('page')}>
              <FaCog className="inline-block mr-2" />
              <span>Detailpage</span>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 overflow-y-auto bg-gray-100">
        {selectedComponent === 'Overview' && (
  <div>
    <h2 className="mb-4 text-2xl font-bold">Dashboard Overview</h2>
    
    {/* Metrics Container */}
    
   {/* Metrics Container */}
   <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        {/* Clients Card */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">Clients</h3>
          <p className="text-3xl font-bold text-blue-600">{achievements.length > 0 ? achievements[0].totalClients : 0}</p>
        </div>

        {/* Revenue Generated Card */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">Revenue Generated</h3>
          <p className="text-3xl font-bold text-green-600">{achievements.length > 0 ? `$${achievements[0].revenueGenerated.toLocaleString()}` : '$0'}</p>
        </div>

        {/* Total Projects Card */}
       {/* Total Projects Card */}
{/* Total Projects Card */}
<div className="p-4 bg-white rounded-lg shadow-md">
  <h3 className="text-sm font-semibold text-gray-600">Total Projects</h3>
  <p className="text-3xl font-bold text-indigo-600">
    {achievements.length > 0 
      ? (Number(achievements[0].completedProjects) || 0) + (Number(achievements[0].pendingProjects) || 0) 
      : 0}
  </p>
</div>



        {/* Pending Projects Card */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">Pending Projects</h3>
          <p className="text-3xl font-bold text-red-600">{achievements.length > 0 ? achievements[0].pendingProjects : 0}</p>
        </div>
      </div>

    {/* Line Graph Section */}
    <Line data={chartData} />
  </div>
)}

{selectedComponent === 'page' && (
    <div>
    <h2 className="mb-4 text-2xl font-bold">Categories</h2>
    <div className="flex flex-col p-2 lg:p-6 md:p-6">
      <button
        className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
        onClick={() => setCategoryIsOpen(true)}
      >
        Add Category
      </button>

      {/* Modal Popup for Category Form */}
      {categoryIsOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative w-full max-w-lg p-6 mx-6 bg-white rounded-md shadow-lg">
      <button className="absolute text-gray-500 top-2 right-2" onClick={resetpageForm}>
        <FaTimes />
      </button>
      <h2 className="mb-4 text-xl font-bold">Add Category</h2>

      {/* Scrollable Container */}
      <div className="max-h-[500px] overflow-y-auto"> {/* Adjust the max-height as needed */}
        {/* Main Category Input */}
        <select
  value={catPrefixMainCategory}
  onChange={handlepageInputChange}
  className="w-full p-2 mb-2 border rounded-md"
  required
>
<option value="aboutus">About us</option>
              <option value="aiml">Ai Ml</option>
              <option value="android-ios">Android & Ios</option>
              <option value="web-development">Web Development</option>
              <option value="custom-software">Custom Software</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="cloud-solutions">Cloud Solutions</option>
              <option value="graphics-animations">Graphics & Animations</option>
              <option value="training-internship">Training & Internship</option>
              <option value="sap">SAP</option>
              <option value="erpnext">ErpNext</option>
              <option value="workday">Workday</option>
              <option value="salesforce">Salesforce</option>
              <option value="data-solutions">Data Solutions</option>
              <option value="contract-consulting">Contract Consulting</option>
              <option value="aws">AWS</option>
              <option value="health-care">Health Care</option>
              <option value="real-estate">Real Estate</option>
              <option value="banking-finance">Banking & Finance</option>
              <option value="education-elearning">Education & E-learning</option>
              <option value="ecommerce-solutions">Ecommerce Solutions</option>
              <option value="media-entertainment">Media & Entertainment</option>
              <option value="logistiocs-transportation">Logistics & Transportation</option>
              
  
</select>

        {/* Subcategories Input Fields */}
        {catPrefixSubCategories.map((subCategory, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name={`subCategory_${index}`}
              placeholder={`Subcategory ${index + 1} Name`}
              value={subCategory.name}
              onChange={handlepageInputChange}
              className="w-full p-2 mb-2 border rounded-md"
              required
            />
            <textarea
              name={`subDescription_${index}`}
              placeholder={`Subcategory ${index + 1} Description`}
              value={subCategory.description}
              onChange={handlepageInputChange}
              className="w-full p-2 mb-2 border rounded-md"
              rows="3"
              required
            />
            <input
              type="file"
              onChange={(e) => handleSubCategoryImageChange(index, e)}
              className="w-full p-2 mb-2 border rounded-md"
            />
           
          </div>
        ))}

        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
          onClick={handlepageCategorySubmit}
        >
          Upload Category
        </button>
      </div> {/* End of scrollable container */}
    </div>
  </div>
)}


      {/* Display Categories in Table */}
      <table className="min-w-full mt-4 border border-gray-300">
  <thead>
    <tr>
      <th className="p-2 border">Main Category</th>
      <th className="p-2 border">Subcategories</th>
      <th className="p-2 border">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((category) => (
      <tr key={category.id}>
        <td className="p-2 border">{category.mainCategory}</td>
        <td className="p-2 border">
          <ul>
            {category.subCategories.map((sub, index) => (
              <li key={index} className="mb-4">
                <div className="flex items-center">
                  {/* Display the image if available */}
                  {sub.imageUrl && (
                    <img
                      src={sub.imageUrl}
                      alt={`Image of ${sub.name}`}
                      className="object-contain w-16 h-16 mr-2"
                    />
                  )}
                  <div>
                    {/* Subcategory name */}
                    <p className="font-semibold">Name: {sub.name}</p>
                    {/* Subcategory description */}
                    <p>Description: {sub.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </td>
        <td className="p-2 border">
          <button onClick={() => handlepageEdit(category)} className="text-blue-600">
            <FaEdit />
          </button>
          <button onClick={() => handlepageDelete(category.id)} className="ml-2 text-red-600">
            <FaTrash />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  </div>
)}
{selectedComponent === 'achievements' && (
  
  <div>
  <h2 className="mb-4 text-2xl font-bold">Achievements</h2>
  <div className="flex flex-col p-2 lg:p-6 md:p-6">
    <button
      className="w-48 px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md"
      onClick={() => setAchievementIsOpen(true)}
    >
      Add Achievement
    </button>

    {/* Modal Popup for Achievement Form */}
    {achievementIsOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
          <button className="absolute text-gray-500 top-2 right-2" onClick={resetForm}>
            <FaTimes />
          </button>
          <h2 className="mb-4 text-xl font-bold">{achievementEditId ? 'Edit Achievement' : 'Add Achievement'}</h2>

          {/* Input for years of experience */}
          <input
            type="number"
            placeholder="Years of Experience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Input for total clients */}
          <input
            type="number"
            placeholder="Total Clients"
            value={totalClients}
            onChange={(e) => setTotalClients(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Input for completed projects */}
          <input
            type="number"
            placeholder="Completed Projects"
            value={completedProjects}
            onChange={(e) => setCompletedProjects(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Input for pending projects */}
          <input
            type="number"
            placeholder="Pending Projects"
            value={pendingProjects}
            onChange={(e) => setPendingProjects(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Input for happy clients */}
          <input
            type="number"
            placeholder="Happy Clients"
            value={happyClients}
            onChange={(e) => setHappyClients(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Input for revenue generated */}
          <input
            type="number"
            placeholder="Revenue Generated"
            value={revenueGenerated}
            onChange={(e) => setRevenueGenerated(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={handleAchievementSubmit}
          >
            {achievementEditId ? 'Update Achievement' : 'Upload Achievement'}
          </button>
        </div>
      </div>
    )}

    {/* Display Achievements in Table */}
    <table className="mt-4 bg-white border rounded-lg shadow-md">
      <thead>
        <tr className="text-left bg-gray-100">
          <th className="p-4 border-b">Years of Experience</th>
          <th className="p-4 border-b">Total Clients</th>
          <th className="p-4 border-b">Completed Projects</th>
          <th className="p-4 border-b">Pending Projects</th>
          <th className="p-4 border-b">Happy Clients</th>
          <th className="p-4 border-b">Revenue Generated</th>
          <th className="p-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {achievements.map((achievement) => (
          <tr key={achievement.id}>
            <td className="p-4 border-b">{achievement.yearsOfExperience}</td>
            <td className="p-4 border-b">{achievement.totalClients}</td>
            <td className="p-4 border-b">{achievement.completedProjects}</td>
            <td className="p-4 border-b">{achievement.pendingProjects}</td>
            <td className="p-4 border-b">{achievement.happyClients}</td>
            <td className="p-4 border-b">${achievement.revenueGenerated}</td>
            <td className="p-4 border-b">
              <button
                className="mr-2 text-blue-600"
                onClick={() => handleAchievementEdit(achievement)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600"
                onClick={() => handleAchievementDelete(achievement.id)}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
          )}

          {selectedComponent === 'Projects' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Projects</h2>
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
      <button
        className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
        onClick={() => setProjectIsOpen(true)}
      >
        Add Project
      </button>

      {/* Modal Popup for Project Form */}
      {projectIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
            <button className="absolute text-gray-500 top-2 right-2" onClick={() => setProjectIsOpen(false)}>
              <FaTimes />
            </button>
            <h2 className="mb-4 text-xl font-bold">{projectEditId ? 'Edit Project' : 'Add Project'}</h2>

            {/* Input for project name */}
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Input for project description */}
            <input
              type="text"
              placeholder="Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Input for project category */}
            <select
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Category</option>
              <option value="mlai">Ml & Ai</option>
              <option value="frontend">Front-End</option>
              <option value="backend">Back-End</option>
              <option value="digital marketing">Digital Marketing</option>
              <option value="android ios">Android & Ios</option>
              {/* Add more categories as needed */}
            </select>

            {/* Input for project link */}
            <input
              type="url"
              placeholder="Project Link"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Display the file name or allow file selection */}
            <div className="mb-4">
              <label htmlFor="projectImageFile" className="text-gray-600">Select Project Image:</label>
              <input
                type="file"
                id="projectImageFile"
                onChange={handleProjectImageChange}
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>

            {/* Display the project image preview if available */}
            {projectImagePreview && (
              <div className="mb-4">
                <p className="mb-2 text-gray-600">Project Image Preview:</p>
                <img src={projectImagePreview} alt="Project Preview" className="object-contain w-32 h-32" />
              </div>
            )}

            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
              onClick={handleProjectSubmit}
            >
              {projectEditId ? 'Update Project' : 'Upload Project'}
            </button>
          </div>
        </div>
      )}

      {/* Display Projects in Table */}
      <table className="mt-4 bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-4 border-b">Image</th>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Description</th>
            <th className="p-4 border-b">Category</th>
            <th className="p-4 border-b">Link</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="p-4 border-b">
                <img src={project.imageUrl} alt={project.name} className="h-16 w-36" />
              </td>
              <td className="p-4 border-b">{project.name}</td>
              <td className="p-4 border-b">{project.description}</td>
              <td className="p-4 border-b">{project.category}</td>
              <td className="p-4 border-b">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  View Project
                </a>
              </td>
              <td className="p-4 border-b">
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => handleProjectEdit(project)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleProjectDelete(project.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
              {/* Projects Component */}
            </div>
          )}
           {selectedComponent === 'Career' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Career</h2>
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
      <button
        className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
        onClick={() => setJobIsOpen(true)} // Open modal
      >
        Add Job
      </button>

      {/* Modal Popup for Form */}
      {jobIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
            <button className="absolute text-gray-500 top-2 right-2" onClick={() => setJobIsOpen(false)}>
              <FaTimes />
            </button>
            <h2 className="mb-4 text-xl font-bold">{jobEditId ? 'Edit Job' : 'Add Job'}</h2>

            {/* Input for job title */}
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Input for job location */}
            <input
              type="text"
              placeholder="Location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Input for job description */}
            <textarea
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
              onClick={handleJobSubmit}
            >
              {jobEditId ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </div>
      )}

      {/* Display Job Listings in Table */}
      <table className="mt-4 bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-4 border-b">Job Title</th>
            <th className="p-4 border-b">Location</th>
            <th className="p-4 border-b">Description</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="p-4 border-b">{job.title}</td>
              <td className="p-4 border-b">{job.location}</td>
              <td className="p-4 border-b">{job.description}</td>
              <td className="p-4 border-b">
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => handleJobEdit(job)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleJobDelete(job.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
              {/* Projects Component */}
            </div>
          )}
          {selectedComponent === 'Clients' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Clients</h2>
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
  <button
    className="px-4 py-2 mb-4 mr-2 font-bold text-white bg-pink-600 rounded-md w-36"
    onClick={() => setClientIsOpen(true)} // Open modal
  >
    Add Review 
  </button>
  <button
        className="px-4 py-2 mb-4 font-bold text-white bg-blue-600 rounded-md w-36"
        onClick={() => setCompanyIsOpen(true)}
      >
        {companyEditId ? 'Edit Company' : 'Add Company'}
      </button>
     
      {companyIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
            <button
              className="absolute text-gray-500 top-2 right-2"
              onClick={() => setCompanyIsOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="mb-4 text-xl font-bold">
              Add Company
            </h2>

            {/* Input for company link */}
            <input
              type="text"
              placeholder="Company Link"
              value={companyLink}
              onChange={(e) => setCompanyLink(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              required
            />

            {/* Display the file name or allow file selection */}
            <div className="mb-4">
              <label htmlFor="companyImageFile" className="text-gray-600">
                Select Company Logo:
              </label>
              <input
                type="file"
                id="companyImageFile"
                onChange={handleCompanyImageChange}
                className="w-full p-2 mb-2 border rounded-md"
                accept="image/*"
                required={!companyEditId} // Required only when adding a new company
              />
            </div>

            {/* Display the company logo preview if available */}
            {companyImagePreview && (
              <div className="mb-4">
                <p className="mb-2 text-gray-600">Company Logo Preview:</p>
                <img
                  src={companyImagePreview}
                  alt="Company Logo Preview"
                  className="object-contain w-32 h-32"
                />
              </div>
            )}

            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
              onClick={handleCompanySubmit}
            >
              {companyEditId ? 'Update Company' : 'Upload Company'}
            </button>
          </div>
        </div>
      )}

      {/* Company List with Edit and Delete */}
   
  {/* Modal Popup for Form */}
  {clientIsOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
        <button className="absolute text-gray-500 top-2 right-2" onClick={() => setClientIsOpen(false)}>
          <FaTimes />
        </button>
        <h2 className="mb-4 text-xl font-bold">{clientEditId ? 'Edit Client' : 'Add Client'}</h2>

        {/* Input for client name */}
        <input
          type="text"
          placeholder="Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Input for client review */}
        <input
          type="text"
          placeholder="Review"
          value={clientReview}
          onChange={(e) => setClientReview(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Input for client rating */}
        <select
          value={clientRating}
          onChange={(e) => setClientRating(Number(e.target.value))} // Ensure value is a number
          className="w-full p-2 mb-4 border rounded-md"
        >
          <option value={0}>Select Rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        {/* Display the file name or allow file selection */}
        <div className="mb-4">
          <label htmlFor="clientImageFile" className="text-gray-600">Select Client Image:</label>
          <input
            type="file"
            id="clientImageFile"
            onChange={handleClientImageChange}
            className="w-full p-2 mb-2 border rounded-md"
          />
        </div>

        {/* Display the client image preview if available */}
        {clientImagePreview && (
          <div className="mb-4">
            <p className="mb-2 text-gray-600">Client Image Preview:</p>
            <img src={clientImagePreview} alt="Client Preview" className="object-contain w-32 h-32" />
          </div>
        )}

        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
          onClick={handleClientSubmit}
        >
          {clientEditId ? 'Update Client' : 'Upload Client'}
        </button>
      </div>
    </div>
  )}

  {/* Display Companies in Table */}
  <table className="mt-4 bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-4 border-b">Logo</th>
            <th className="p-4 border-b">Link</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="p-4 border-b">
                <img src={company.logoUrl} alt={company.link} className="w-32 h-16" />
              </td>
              <td className="p-4 border-b">
                <a href={company.link} target="_blank" rel="noopener noreferrer">
                  {company.link}
                </a>
              </td>
              <td className="p-4 border-b">
            <button
              className="mr-2 text-blue-600"
              onClick={() => handleCompanyEdit(company)}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-600"
              onClick={() => handleCompanyDelete(company.id)}
            >
              <FaTrash />
            </button>
          </td>
            </tr>
          ))}
        </tbody>
      </table>
    

  {/* Display Client Members in Table */}
  <table className="mt-4 bg-white border rounded-lg shadow-md">
    <thead>
      <tr className="text-left bg-gray-100">
        <th className="p-4 border-b">Image</th>
        <th className="p-4 border-b">Name</th>
        <th className="p-4 border-b">Review</th>
        <th className="p-4 border-b">Rating</th>
        <th className="p-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {clients.map((client) => (
        <tr key={client.id}>
          <td className="p-4 border-b">
            <img src={client.imageUrl} alt={client.name} className="h-16 w-36" />
          </td>
          <td className="p-4 border-b">{client.name}</td>
          <td className="p-4 border-b">{client.description}</td>
          <td className="p-4 border-b">{client.rating} / 5</td>
          <td className="p-4 border-b">
            <button
              className="mr-2 text-blue-600"
              onClick={() => handleClientEdit(client)}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-600"
              onClick={() => handleClientDelete(client.id)}
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div>
      <h1 className="mb-4 text-2xl font-bold">Contact List</h1>

      {/* Table displaying contacts */}
      <table className="mt-4 bg-white border rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="p-4 border-b">First Name</th>
            <th className="p-4 border-b">Last Name</th>
            <th className="p-4 border-b">Phone</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Message</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="p-4 border-b">{contact.first_name}</td>
              <td className="p-4 border-b">{contact.last_name}</td>
              <td className="p-4 border-b">{contact.phone}</td>
              <td className="p-4 border-b">{contact.email}</td>
              <td className="p-4 border-b">{contact.message}</td>
              <td className="p-4 border-b">
                {/* <button
                  onClick={() => handleEdit(contact.id)}
                  className="px-2 py-1 mr-2 text-white bg-blue-500 rounded-md"
                >
                 <FaEdit/>
                </button> */}
                <button
                  onClick={() => handlecontactDelete(contact.id)}
                  className="text-red-500 rounded-md "
                >
                 <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>
              {/* Clients Component */}
   
            </div>
          )}
          {selectedComponent === 'TeamMembers' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Team Members</h2>
              {/* Team Members Component */}
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
  <button
    className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
    onClick={() => setTeamIsOpen(true)} // Open modal
  >
    Add Team 
  </button>

  {/* Modal Popup for Form */}
  {teamIsOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
        <button className="absolute text-gray-500 top-2 right-2" onClick={() => setTeamIsOpen(false)}>
          <FaTimes />
        </button>
        <h2 className="mb-4 text-xl font-bold">{teamEditId ? 'Edit Team' : 'Add Team'}</h2>

        {/* Input for logo name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Input for team role */}
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Display the file name or allow file selection */}
        <div className="mb-4">
          <label htmlFor="teamImageFile" className="text-gray-600">Select Team Image:</label>
          <input
            type="file"
            id="teamImageFile"
            onChange={handleTeamImageChange}
            className="w-full p-2 mb-2 border rounded-md"
          />
          {/* Show file name if editing and logo exists */}
          {/* {teamimagePreview && (
            <p className="mt-2 text-sm text-gray-600">
              Current File: {teamimagePreview}
            </p>
          )} */}
        </div>

        {/* Display the team image preview if available */}
        {teamimagePreview && (
          <div className="mb-4">
            <p className="mb-2 text-gray-600">Team Image Preview:</p>
            <img src={teamimagePreview} alt="Team Preview" className="object-contain w-32 h-32" />
          </div>
        )}

        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
          onClick={handleTeamSubmit}
        >
          {teamEditId ? 'Update Team' : 'Upload Team'}
        </button>
      </div>
    </div>
  )}

  {/* Display Team Members in Table */}
  <table className="mt-4 bg-white border rounded-lg shadow-md ">
    <thead>
      <tr className="text-left bg-gray-100">
        <th className="p-4 border-b">Image</th>
        <th className="p-4 border-b">Name</th>
        <th className="p-4 border-b">Role</th>
        <th className="p-4 border-b">Description</th>
        <th className="p-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {teamMembers.map((team) => (
        <tr key={team.id}>
          <td className="p-4 border-b">
            <img src={team.imageUrl} alt={team.name} className="h-16 w-36" />
          </td>
          <td className="p-4 border-b">{team.name}</td>
          <td className="p-4 border-b">{team.role}</td>
          <td className="p-4 border-b">{team.description}</td>
          <td className="p-4 border-b">
            <button
              className="mr-2 text-blue-600"
              onClick={() => handleTeamEdit(team)}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-600"
              onClick={() => handleTeamDelete(team.id)}
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
            </div>
          )}
          {selectedComponent === 'ServerMonitoring' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Website <span className='text-pink-600'>Logo</span></h2>
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
      <button
        className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
        onClick={() => setFormOpen(true)}
      >
        Add Logo
      </button>

      {/* Modal Popup for Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
            <button className="absolute text-gray-500 top-2 right-2" onClick={() => setFormOpen(false)}>
              <FaTimes/>
            </button>
            <h2 className="mb-4 text-xl font-bold">{isEditing ? 'Edit Logo' : 'Add Logo'}</h2>

            {/* Input for logo name */}
            <input
              type="text"
              placeholder="Logo Name"
              value={logoName}
              onChange={(e) => setLogoName(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Display the file name or allow file selection */}
            <div className="mb-4">
              <label htmlFor="logoFile" className="text-gray-600">Select Logo File:</label>
              <input
                type="file"
                id="logoFile"
                onChange={handleFileChange}
                className="w-full p-2 mb-2 border rounded-md"
              />
              {/* Show file name if editing and logo exists */}
              {selectedFileName && (
                <p className="mt-2 text-sm text-gray-600">
                  Current File: {selectedFileName}
                </p>
              )}
            </div>

            {/* Display the logo preview if available */}
            {logoPreview && (
              <div className="mb-4">
                <p className="mb-2 text-gray-600">Logo Preview:</p>
                <img src={logoPreview} alt="Logo Preview" className="object-contain w-32 h-32" />
              </div>
            )}

            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
              onClick={handleLogoUpload}
            >
              {isEditing ? 'Update Logo' : 'Upload Logo'}
            </button>
          </div>
        </div>
      )}

      {/* Display Logos in Table */}
      <table className="mt-4 bg-white border rounded-lg shadow-md ">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-4 border-b">Logo</th>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logos.map((logo) => (
            <tr key={logo.id}>
              <td className="p-4 border-b">
                <img src={logo.url} alt={logo.name} className="h-16 w-36" />
              </td>
              <td className="p-4 border-b">{logo.name}</td>
              <td className="p-4 border-b">
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => handleEdit(logo.id, logo.name, logo.url)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(logo.id, logo.url)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></div>
          )}
          {selectedComponent === 'SupportTickets' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Website <span className='text-pink-600'>Banners</span></h2>
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
      <button
        className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
        onClick={() => setBannerFormOpen(true)}
      >
        Add Banner
      </button>

      {/* Modal Popup for Banner Form */}
      {isBannerFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
            <button
              className="absolute text-gray-500 top-2 right-2"
              onClick={() => setBannerFormOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="mb-4 text-xl font-bold">
              {bannerIsEditing ? 'Edit Banner' : 'Add Banner'}
            </h2>

            {/* Input for banner link */}
            <input
              type="text"
              placeholder="Link"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Select category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 mb-4 border"
            >
              <option value="">Select Category</option>
              <option value="aboutus">About us</option>
              <option value="aiml">Ai Ml</option>
              <option value="android-ios">Android & Ios</option>
              <option value="web-development">Web Development</option>
              <option value="custom-software">Custom Software</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="cloud-solutions">Cloud Solutions</option>
              <option value="graphics-animations">Graphics & Animations</option>
              <option value="training-internship">Training & Internship</option>
              <option value="sap">SAP</option>
              <option value="erpnext">ErpNext</option>
              <option value="workday">Workday</option>
              <option value="salesforce">Salesforce</option>
              <option value="data-solutions">Data Solutions</option>
              <option value="contract-consulting">Contract Consulting</option>
              <option value="aws">AWS</option>
              <option value="health-care">Health Care</option>
              <option value="real-estate">Real Estate</option>
              <option value="banking-finance">Banking & Finance</option>
              <option value="education-elearning">Education & E-learning</option>
              <option value="ecommerce-solutions">Ecommerce Solutions</option>
              <option value="media-entertainment">Media & Entertainment</option>
              <option value="logistiocs-transportation">Logistics & Transportation</option>
              <option value="contactus">Contact Us</option>
              <option value="hiring">Hiring</option>
              <option value="portfolio">Portfolio</option>
             
            </select>

            {/* File selection for banner */}
            <div className="mb-4">
              <label htmlFor="bannerFile" className="text-gray-600">Select Banner File:</label>
              <input
                type="file"
                id="bannerFile"
                onChange={handleBannerChange}
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>

            {/* Preview the selected banner */}
            {bannerPreview && (
              <div className="mb-4">
                <p className="mb-2 text-gray-600">Banner Preview:</p>
                <img src={bannerPreview} alt="Banner Preview" className="object-contain w-32 h-32" />
              </div>
            )}

            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
              onClick={handleBannerUpload}
            >
              {bannerIsEditing ? 'Update Banner' : 'Upload Banner'}
            </button>
          </div>
        </div>
      )}

      {/* Display Banners in Table */}
      <table className="mt-4 bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-4 border-b">Banner</th>
            <th className="p-4 border-b">Category</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td className="p-4 border-b">
                <img src={banner.url} alt={banner.category} className="h-16 w-36" />
              </td>
              <td className="p-4 border-b">{banner.category}</td>
              <td className="p-4 border-b">
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => handleBannerEdit(banner.id, banner.link, banner.url, banner.category)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleBannerDelete(banner.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            </div>
          )}
          {selectedComponent === 'FinancialReports' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Hero Slider</h2>
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
    <button
      className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
      onClick={() => setSliderFormOpen(true)}
    >
      Add Slider
    </button>

    {/* Modal Popup for Slider Form */}
    {isSliderFormOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-md p-6 mx-6 bg-white rounded-md shadow-lg">
          <button
            className="absolute text-gray-500 top-2 right-2"
            onClick={() => setSliderFormOpen(false)}
          >
            <FaTimes />
          </button>
          <h2 className="mb-4 text-xl font-bold">
            {sliderIsEditing ? 'Edit Slider' : 'Add Slider'}
          </h2>

          {/* Input for slider link */}
          <input
            type="text"
            placeholder="Link"
            value={sliderLink}
            onChange={(e) => setSliderLink(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* File selection for slider */}
          <div className="mb-4">
            <label htmlFor="sliderFile" className="text-gray-600">Select Slider File:</label>
            <input
              type="file"
              id="sliderFile"
              onChange={handleSliderChange}
              className="w-full p-2 mb-2 border rounded-md"
            />
          </div>

          {/* Preview the selected slider */}
          {sliderPreview && (
            <div className="mb-4">
              <p className="mb-2 text-gray-600">Slider Preview:</p>
              <img src={sliderPreview} alt="Slider Preview" className="object-contain w-32 h-32" />
            </div>
          )}

          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={handleSliderUpload}
          >
            {sliderIsEditing ? 'Update Slider' : 'Upload Slider'}
          </button>
        </div>
      </div>
    )}

    {/* Display Sliders in Table */}
    <table className="mt-4 bg-white border rounded-lg shadow-md">
      <thead>
        <tr className="text-left bg-gray-100">
          <th className="p-4 border-b">Slider</th>
          <th className="p-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sliders.map((slider) => (
          <tr key={slider.id}>
            <td className="p-4 border-b">
              <img src={slider.url} alt="slider" className="h-16 w-36" />
            </td>
            <td className="p-4 border-b">
              <button
                className="mr-2 text-blue-600"
                onClick={() => handleSliderEdit(slider.id, slider.link, slider.url)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600"
                onClick={() => handleSliderDelete(slider.id)}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
            </div>
          )}
          {selectedComponent === 'Settings' && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Blog</h2>
              
           
              {/* Settings Component */}
              <div className="flex flex-col p-2 lg:p-6 md:p-6">
      <button
        className="px-4 py-2 mb-4 font-bold text-white bg-pink-600 rounded-md w-36"
        onClick={() => setIsOpen(true)}
      >
        Add Blog
      </button>

      {/* Modal Popup for Blog Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-md shadow-lg">
            <button
              className="absolute text-gray-500 top-2 right-2"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
           

            {/* Container with scrolling enabled */}
            <div className="max-h-[80vh] overflow-auto p-4"> {/* Adjust max height */}
              <form onSubmit={handleSubmit}>
                {/* Form Fields as before */}
                
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-2 text-sm font-bold">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block mb-2 text-sm font-bold">
                    Content
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                    className="border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="block mb-2 text-sm font-bold">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {/* Image preview */}
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="object-cover w-full h-48" />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block mb-2 text-sm font-bold">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="detailPageContent" className="block mb-2 text-sm font-bold">
                    Detail Page Content
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={detailPageContent}
                    onChange={(newContent) => setDetailPageContent(newContent)}
                    className="border border-gray-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md"
                >
                  {editId ? 'Update Blog' : 'Upload Blog'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Display Blogs in Table */}
      <table className="mt-4 bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-4 border-b">Title</th>
            <th className="p-4 border-b">Image</th>
            <th className="p-4 border-b">Content</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="p-4 border-b">{blog.title}</td>
              <td className="p-4 border-b">
                <img src={blog.imageUrl} alt={blog.title} className="object-cover h-16 w-36" />
              </td>
              <td className="p-2 border" dangerouslySetInnerHTML={{ __html: stripHtmlTags(blog.content) }} />
              <td className="p-4 border-b">
                <button
                  className="px-2 py-1 mr-2 text-blue-600"
                  onClick={() => handleBlogEdit(blog)}
                >
                  <FaEdit />
                </button>
                <button
                  className="px-2 py-1 text-red-600"
                  onClick={() => handleBlogDelete(blog.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      {/* <footer className="p-4 text-center text-white bg-blue-800">
        <p>&copy; 2024 IT Company Admin Dashboard</p>
      </footer> */}
    </div>
  );
};

export default Dashboard;
