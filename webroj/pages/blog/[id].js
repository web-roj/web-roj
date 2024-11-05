import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '@/Firebase/config';
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { FaArrowRight, FaFacebook, FaInstagram, FaSearch, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2; // Set number of posts per page

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          setPost(postData);
          fetchRelatedPosts(postData.category);
        }
      }
    };

    const fetchLatestPosts = async () => {
      try {
        const blogCollection = collection(db, 'blogs');
        const latestQuery = query(blogCollection, orderBy('date', 'desc'), limit(5));
        const latestSnapshot = await getDocs(latestQuery);
        const latestBlogs = latestSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLatestPosts(latestBlogs);
      } catch (error) {
        console.error("Error fetching latest posts: ", error);
      }
    };

    const fetchRelatedPosts = async (category) => {
      if (category) {
        try {
          const blogCollection = collection(db, 'blogs');
          const relatedQuery = query(
            blogCollection,
            where('category', '==', category),
            orderBy('date', 'desc')
          );
          const relatedSnapshot = await getDocs(relatedQuery);
          const relatedBlogs = relatedSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setRelatedPosts(relatedBlogs);
        } catch (error) {
          console.error("Error fetching related posts: ", error);
        }
      }
    };

    fetchPost();
    fetchLatestPosts();
  }, [id]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter latest posts based on the search term
  const filteredLatestPosts = latestPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredLatestPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredLatestPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!post) return <div>Loading...</div>;

  const truncateTitle = (title) => {
    return title.split(' ').slice(0, 2).join(' ');
  };

  return (
    <div className="flex flex-col lg:flex-row ">
       <Head>
      <title>Blog - Webroj Software Company</title>
      <meta name="description" content="Stay updated with the latest insights, trends, and news in technology and software development through our blog." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  {/* Left Column */}
  <div className="flex-1 ">
    {/* Banner Section */}
    <div className="w-full h-[9rem] bg-pink-500 text-white flex items-center justify-center ">
      <h1 className="text-4xl font-bold">{post.title}</h1>
    </div>
    

    {/* Post Detail Content */}
   <div className='px-4 lg:px-6 md:px-6'>
   <div className="p-4 mt-6 border rounded-md shadow-md lg:p-10">
      <div className="w-full text-justify">
        <div dangerouslySetInnerHTML={{ __html: post.detailPageContent }} />
      </div>
    </div>

    {/* Related Posts */}
    <h1 className="mt-8 mb-8 text-2xl font-bold">Related Posts</h1>
        <div className="flex flex-wrap">
          {currentPosts.map((post) => (
            <div key={post.id} className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="transition duration-300 border rounded-md shadow-md group hover:shadow-green-500 hover:border-green-500">
                <Link href={`/blog/${post.id}`}>
                  <div>
                    <div className="relative h-40">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full p-4 border rounded-t-md h-36"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-black truncate">{truncateTitle(post.title)}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 mb-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-[#fc005f] text-white' : 'bg-white'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
   </div>
  </div>
</div>

  );
};

export default BlogPost;
