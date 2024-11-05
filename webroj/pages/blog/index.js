import React, { useEffect, useState } from 'react';
import { db } from '@/Firebase/config'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';
import { FaSearch, FaRegCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogPosts, setFilteredBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const blogsCollection = collection(db, 'blogs'); // Replace 'blogs' with your collection name
      const blogSnapshot = await getDocs(blogsCollection);
      const blogsList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogPosts(blogsList);
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const filtered = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogPosts(filtered);
  }, [searchTerm, blogPosts]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' ...' : content;
  };

  return (
    <div className="container p-4 mx-auto">
       <Head>
      <title>Blog - Webroj Software Company</title>
      <meta name="description" content="Stay updated with the latest insights, trends, and news in technology and software development through our blog." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
      <div className="flex flex-wrap">
        <div className="w-full lg:px-4 md:w-9/12">
          <h1 className="mb-8 text-2xl font-bold">Latest Posts</h1>
          {filteredBlogPosts.length > 0 ? (
            filteredBlogPosts.map(post => (
              <div key={post.id} className="mb-6 overflow-hidden border rounded-md shadow-md group hover:shadow-[#fc005f] hover:border-[#fc005f]">
                <Link href={`/blog/${post.id}`}>
                  <div className="flex">
                    <img
                      src={post.imageUrl} // Make sure this path is correct
                      alt={post.title}
                      className="w-40 h-[100px] p-6 lg:p-4 lg:w-64 lg:h-40 object-fill"
                    />
                    <div className="w-2/3 p-2 lg:p-4">
                      <h3 className="hidden mb-2 text-xl font-semibold sm:block">{truncateContent(post.title, 9)}</h3>
                      <h3 className="text-[130%] font-semibold lg:hidden truncate-content">
                        {truncateContent(post.title, 9)}
                      </h3>
                      <p className="hidden mb-4 text-gray-700 sm:block">
                        <div dangerouslySetInnerHTML={{ __html: truncateContent(post.content, 30) }} />
                      </p>
                      <div className="flex items-center hidden mb-2 text-sm text-gray-600 sm:block">
                        <FaRegCalendarAlt className="mr-2" /><span>{new Date(post.date).toLocaleDateString()}</span>
                        
                      </div>
                      <Link href={`/blog/${post.id}`} className="hidden text-blue-500 hover:underline sm:block">
                        Read More &rarr;
                      </Link>
                    </div>
                  </div>
                </Link>
                <p className="mb-4 px-4 text-gray-700 lg:hidden text-[80%]">{truncateContent(post.content, 30)}</p>
                <div className="flex flex-row justify-between px-4 mb-2">
                  <div className="flex items-center mb-2 text-sm text-gray-600 lg:hidden">
                    <FaRegCalendarAlt className="mr-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline lg:hidden">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found for this category.</p>
          )}
        </div>

        <div className="hidden w-full p-2 md:w-3/12 sm:block">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search blogs...."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 pl-10 border border-[#fc005f] rounded"
            />
            <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-3" />
          </div>
          <h1 className="mb-8 text-2xl font-bold">Related Posts</h1>
          <ul className="p-6">
            {filteredBlogPosts.map(post => (
              <li key={post.id} className="flex items-center mb-4 border-b border-[#fc005f]">
                <Link href={`/blog-online/${post.id}`} className="flex items-center w-full mb-4">
                  <img src={post.imageUrl} alt={post.title} className="object-cover w-16 h-16 mr-4 rounded-full" />
                  <span className="text-blue-400 hover:underline">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
