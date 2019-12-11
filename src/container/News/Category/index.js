import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CategoryForm from 'components/New/Category/CategoryForm';
import SortableTree, { toggleExpandedForAll, addNodeUnderParent } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

function Category() {
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Fish', children: [{ title: 'fingerline' }] }
  ]);
  const [addChildrenActive, setAddChildrenActive] = useState(true);
  const [treeActive, setTreeActive] = useState({
    show: false,
    hiden: false
  });

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const changeTree = treeData => {
    setData(treeData);
  };
  const expansion = expanded => {
    if (expanded) {
      setTreeActive(treeActive => ({
        ...treeActive,
        show: true,
        hiden: false
      }));
    } else {
      setTreeActive(treeActive => ({
        ...treeActive,
        show: false,
        hiden: true
      }));
    }
    const newData = toggleExpandedForAll({ treeData: data, expanded });
    setData(newData);
  };

  const addNode = () => {
    const newData = [...data, { title: 'demo' }];
    setData(newData);
  };

  const getNodeKey = ({ treeIndex }) => treeIndex;
  const click = (node, path) => {
    const newData = addNodeUnderParent({
      treeData: data,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey,
      newNode: {
        title: 'Vanh'
      },
      addAsFirstChild: false
    });
    console.log(newData.treeData);
    setData(newData.treeData);
  };

  return (
    <React.Fragment>
      <h4> {t('category')}</h4>
      <Row className="category__wapper">
        <Col lg={3} md={4}>
          <Button className="mb-2" onClick={addNode}>
            {t('category_page.addRoot')}
          </Button>
          <Button className="mb-2" disabled={addChildrenActive}>
            {t('category_page.addChildren')}
          </Button>
          <div>
            <span
              className={treeActive.hiden ? 'active__tree span__link' : 'span__link'}
              onClick={() => expansion(false)}
            >
              {t('category_page.hideAll')}
            </span>
            |
            <span
              className={treeActive.show ? 'active__tree span__link' : 'span__link'}
              onClick={() => expansion(true)}
            >
              {t('category_page.showAll')}
            </span>
          </div>
          <div style={{ height: '100%' }}>
            <SortableTree
              treeData={data}
              onChange={treeData => changeTree(treeData)}
              generateNodeProps={({ node, path }) => ({
                onClick: () => click(node, path)
              })}
              theme={FileExplorerTheme}
            />
          </div>
        </Col>
        <Col lg={9} md={8}>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  {t('general')}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <CategoryForm />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Category;
