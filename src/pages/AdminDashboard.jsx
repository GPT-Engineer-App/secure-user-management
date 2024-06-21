import { useState, useEffect } from "react";
import { Container, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaUser, FaChartLine, FaFileAlt, FaList } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [userActivities, setUserActivities] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [systemPerformance, setSystemPerformance] = useState({});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch user activities
    axios.get("/api/user-activities").then((response) => setUserActivities(response.data));

    // Fetch user accounts
    axios.get("/api/user-accounts").then((response) => setUserAccounts(response.data));

    // Fetch system performance
    axios.get("/api/system-performance").then((response) => setSystemPerformance(response.data));

    // Fetch logs
    axios.get("/api/logs").then((response) => setLogs(response.data));
  }, []);

  return (
    <Container maxW="container.xl" p={4}>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab><FaList />&nbsp;User Activities</Tab>
          <Tab><FaUser />&nbsp;User Accounts</Tab>
          <Tab><FaChartLine />&nbsp;System Performance</Tab>
          <Tab><FaFileAlt />&nbsp;Logs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              {userActivities.map((activity, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%">
                  <Text>{activity.description}</Text>
                  <Text fontSize="sm" color="gray.500">{activity.timestamp}</Text>
                </Box>
              ))}
            </VStack>
          </TabPanel>

          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User ID</Th>
                  <Th>Email</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userAccounts.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.id}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button colorScheme="blue" size="sm">Edit</Button>
                        <Button colorScheme="red" size="sm">Delete</Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4}>
              <Box p={4} borderWidth="1px" borderRadius="lg" w="100%">
                <Text>CPU Usage: {systemPerformance.cpuUsage}%</Text>
                <Text>Memory Usage: {systemPerformance.memoryUsage}MB</Text>
                <Text>Disk Space: {systemPerformance.diskSpace}GB</Text>
              </Box>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4}>
              {logs.map((log, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%">
                  <Text>{log.message}</Text>
                  <Text fontSize="sm" color="gray.500">{log.timestamp}</Text>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;