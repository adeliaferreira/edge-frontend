import React from 'react';
import {
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  Text,
  TextVariants,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import { useSelector, shallowEqual } from 'react-redux';
import DateFormat from '@redhat-cloud-services/frontend-components/DateFormat';
import { distributionMapper } from './constants';


const ImageDetailTab = () => {
  const { data } = useSelector(
    ({ imageDetailReducer }) => ({ data: imageDetailReducer?.data || null }),
    shallowEqual
  );

  const { imageSetData } = useSelector(
    ({ imageSetDetailReducer }) => ({ imageSetData: imageSetDetailReducer?.data || null }),
    shallowEqual
  );


  const dateFormat = () => <DateFormat date={data['CreatedAt']} />;
  const labelsToValueMapperLeftTop = {
    'Image name': 'Name',
    Version: 'Version',
    Created: () => dateFormat(),
    Release: () => distributionMapper[data['Distribution']],
    'Size': '2.2g',
    Description: 'Description',
  };

  const labelsToValueMapperLeftBottom = {
    'Username': 'Andarberkwine',
    'SSH Key': 'SSH-RSA asnauidnsdfoigdfgntohi hnoihtoirhrdngdion',
  };

  const labelsToValueMapperRightTop = {
    'Total Additional Packages': '8',
    'Total Packages': '2456',
  };

  const labelsToValueMapperRightBottom = {
    Added: '0',
    Removed: '0',
    Updated: '24',
  };

  if (data?.Installer?.Checksum) {
    labelsToValueMapperLeftTop['SHA-256 Checksum'] = () =>
      data?.Installer?.Checksum;
  }

  return (
    <TextContent className="pf-u-ml-lg pf-u-mt-md">
      <Flex>
        <FlexItem flex={{ default: 'flex_1' }}>
          <Text component={TextVariants.h3}>Most recent imag </Text>
          <TextList component={TextListVariants.dl}>
            {data
              ? Object.entries(labelsToValueMapperLeftTop).map(
                  ([label, value]) => {
                    return (
                      <>
                        <TextListItem component={TextListItemVariants.dt}>
                          {label}
                        </TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>
                          {typeof value === 'function' ? value() : data[value]}
                        </TextListItem>
                      </>
                    );
                  }
                )
              : null}
          </TextList>
          <Text component={TextVariants.h3}>User Information </Text>
          <TextList component={TextListVariants.dl}>
            {imageSetData
              ? Object.entries(labelsToValueMapperLeftBottom).map(
                  ([label, value]) => {
                    return (
                      <>
                        <TextListItem component={TextListItemVariants.dt}>
                          {label}
                        </TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>
                          {typeof value === 'function' ? value() : value}
                        </TextListItem>
                      </>
                    );
                  }
                )
              : null}
          </TextList>
        </FlexItem>
        <FlexItem flex={{ default: 'flex_1' }}>
          <Text component={TextVariants.h3}>Packages </Text>
          <TextList component={TextListVariants.dl}>
            {data
              ? Object.entries(labelsToValueMapperRightTop).map(
                  ([label, value]) => {
                    return (
                      <>
                        <TextListItem component={TextListItemVariants.dt}>
                          {label}
                        </TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>
                          {typeof value === 'function' ? value() : value}
                        </TextListItem>
                      </>
                    );
                  }
                )
              : null}
          </TextList>
          <Text component={TextVariants.h3}>Changes from previous version</Text>
          <TextList component={TextListVariants.dl}>
            {data
              ? Object.entries(labelsToValueMapperRightBottom).map(
                  ([label, value]) => {
                    return (
                      <>
                        <TextListItem component={TextListItemVariants.dt}>
                          {label}
                        </TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>
                          {typeof value === 'function' ? value() : value}
                        </TextListItem>
                      </>
                    );
                  }
                )
              : null}
          </TextList>
        </FlexItem>
      </Flex>
    </TextContent>
  );
};

export default ImageDetailTab;
