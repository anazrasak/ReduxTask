import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { getCurrentUser, setCurrentUser, getUsers } from '../utils/storage';

import { NavigationProp } from '@react-navigation/native';

const Dashboard = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [user, setUser] = useState(null);
  const [ip, setIp] = useState('');
  const [country, setCountry] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      
      // Fetch IP
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        setIp(ipResponse.data.ip);
        
        // Fetch country
        const countryResponse = await axios.get(`http://ip-api.com/json/${ipResponse.data.ip}`);
        setCountry(countryResponse.data.country);
      } catch (error) {
        console.log('Error fetching IP/country:', error);
      }
    };
    
    loadUser();
  }, []);

  const handleLogout = async () => {
    await setCurrentUser(null);
    navigation.replace('Login');
  };

  const fetchAllUsers = async () => {
    const users = await getUsers();
    setAllUsers(users);
  };

  
console.log('Hii');

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username}!</Text>
      
      <View style={styles.infoContainer}>
        <Text>Your IP: {ip || 'Loading...'}</Text>
        <Text>Country: {country || 'Loading...'}</Text>
      </View>
      
      {user?.isAdmin && (
        <View style={styles.adminSection}>
          <Button title="Fetch All Users" onPress={fetchAllUsers} />
          {allUsers.length > 0 && (
            <View style={styles.usersList}>
              <Text style={styles.usersTitle}>Registered Users:</Text>
              {allUsers.map((u, index) => (
                <Text key={index}>
                  {u.username} {u.isAdmin ? '(Admin)' : ''}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
      
      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  adminSection: {
    marginBottom: 20,
  },
  usersList: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  usersTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Dashboard;