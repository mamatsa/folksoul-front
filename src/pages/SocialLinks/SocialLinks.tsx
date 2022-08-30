import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SocialLink } from 'types';
import { getSocialLinksRequest } from 'services';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { SocialLinkCard } from 'pages/SocialLinks/components';

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>();
  useEffect(() => {
    const getSocialLinks = async () => {
      try {
        const res = await getSocialLinksRequest();
        setSocialLinks(res.data.socialLinks);
      } catch (e) {
        console.log('something went wrong');
      }
    };
    getSocialLinks();
  }, []);

  return (
    <DashboardWrapper>
      <DashboardPageTitle title='სოციალური ბმულები' />
      <div className=' w-full h-full flex flex-col items-center gap-12 py-16'>
        {socialLinks &&
          socialLinks.map((socialLink, i) => {
            return <SocialLinkCard socialLink={socialLink} key={i} />;
          })}
      </div>
      <Link to='#' className='text-link-blue underline text-lg font-bold mb-20'>
        დაამატე სოციალური ბმული
      </Link>
    </DashboardWrapper>
  );
};

export default SocialLinks;
