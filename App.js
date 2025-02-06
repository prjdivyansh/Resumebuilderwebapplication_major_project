import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function ResumeBuilder() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [hardSkills, setHardSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const [achievements, setAchievements] = useState('');
  const [interests, setInterests] = useState('');
  const [objective, setObjective] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const generatePDF = async () => {
    if (!name || !email || !phone || !education) {
      Alert.alert("Error", "Please fill in all required fields: Name, Email, Phone, and Education.");
      return;
    }
    
    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .container { display: flex; }
          .left-column { width: 30%; padding-right: 20px; border-right: 2px solid #000; }
          .right-column { width: 70%; padding-left: 20px; }
          h1, h2 { text-align: center; }
          h2 { border-bottom: 2px solid #000; padding-bottom: 5px; }
          p { margin: 10px 0; }
        </style>
      </head>
      <body>
        <h1>${name}</h1>
        <div class="container">
          <div class="left-column">
            <h2>Skills</h2>
            <p><strong>Soft Skills:</strong> ${softSkills}</p>
            <p><strong>Hard Skills:</strong> ${hardSkills}</p>
            <h2>Education</h2>
            <p>${education}</p>
            <h2>Achievements & Certifications</h2>
            <p>${achievements}</p>
            <p>${certifications}</p>
          </div>
          <div class="right-column">
            <h2>Personal Information</h2>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Father's Name:</strong> ${fatherName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h2>Experience</h2>
            <p>${experience}</p>
            <h2>About Me</h2>
            <p>${aboutMe}</p>
            <h2>Objective</h2>
            <p>${objective}</p>
            <h2>Interests</h2>
            <p>${interests}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, { mimeType: 'application/pdf' });
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Resume Builder</Text>
      <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput placeholder="Father's Name" value={fatherName} onChangeText={setFatherName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />
      <TextInput placeholder="Experience (e.g., Job title, company, dates)" value={experience} onChangeText={setExperience} multiline style={styles.input} />
      <TextInput placeholder="About Me" value={aboutMe} onChangeText={setAboutMe} multiline style={styles.input} />
      <TextInput placeholder="Objective" value={objective} onChangeText={setObjective} multiline style={styles.input} />
      <TextInput placeholder="Soft Skills" value={softSkills} onChangeText={setSoftSkills} multiline style={styles.input} />
      <TextInput placeholder="Hard Skills" value={hardSkills} onChangeText={setHardSkills} multiline style={styles.input} />
      <TextInput placeholder="Education" value={education} onChangeText={setEducation} multiline style={styles.input} />
      <TextInput placeholder="Achievements" value={achievements} onChangeText={setAchievements} multiline style={styles.input} />
      <TextInput placeholder="Certifications" value={certifications} onChangeText={setCertifications} multiline style={styles.input} />
      <TextInput placeholder="Interests" value={interests} onChangeText={setInterests} multiline style={styles.input} />
      <Button title="Download Resume PDF" onPress={generatePDF} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
