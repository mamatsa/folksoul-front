import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SocialLink } from 'types';
import { getSocialLinksRequest } from 'services';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { SocialLinkCard } from 'pages/SocialLinks/components';

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>();
  const [socialLinkChanged, setSocialLinkChanged] = useState(0);

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
  }, [socialLinkChanged]);

  const socialLinkChangeHandler = () => {
    setSocialLinkChanged((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <DashboardWrapper>
      <DashboardPageTitle title='სოციალური ბმულები' />
      <div className=' w-full h-full flex flex-col items-center gap-12 py-16'>
        {socialLinks &&
          socialLinks.map((socialLink, i) => {
            return (
              <SocialLinkCard
                socialLink={socialLink}
                key={i}
                socialLinkChangeHandler={socialLinkChangeHandler}
              />
            );
          })}
      </div>
      <Link
        to='/social-links/add-social-link'
        className='text-link-blue underline text-lg font-bold mb-20'
      >
        დაამატე სოციალური ბმული
      </Link>
    </DashboardWrapper>
  );
};

export default SocialLinks;
