import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Container, FormControlLabel, Paper, Radio, RadioGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Popup from './Popup';
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import ButtonAppBar from "./ButtonAppBar";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            flexGrow: 1,
        },
    }, heading: {
        color: 'black', textAlign: 'center', fontSize: '25px', textDecoration: 'none', fontWeight: 'bold',
    },
}));

const states = [
    {value: 'Andhra Pradesh', label: 'Andhra Pradesh'},
    {value: 'Arunachal Pradesh', label: 'Arunachal Pradesh'},
    {value: 'Assam', label: 'Assam'},
    {value: 'Bihar', label: 'Bihar'},
    {value: 'Chhattisgarh', label: 'Chhattisgarh'},
    {value: 'Delhi', label: 'Delhi'},
    {value: 'Goa', label: 'Goa'},
    {value: 'Gujarat', label: 'Gujarat'},
    {value: 'Haryana', label: 'Haryana'},
    {value: 'Himachal Pradesh', label: 'Himachal Pradesh'},
    {value: 'Jammu Kashmir', label: 'Jammu Kashmir'},
    {value: 'Jharkhand', label: 'Jharkhand'},
    {value: 'Karnataka', label: 'Karnataka'},
    {value: 'Kerala', label: 'Kerala'},
    {value: 'Madhya Pradesh', label: 'Madhya Pradesh'},
    {value: 'Maharashtra', label: 'Maharashtra'},
    {value: 'Manipur', label: 'Manipur'},
    {value: 'Meghalaya', label: 'Meghalaya'},
    {value: 'Mizoram', label: 'Mizoram'},
    {value: 'Nagaland', label: 'Nagaland'},
    {value: 'Odisha', label: 'Odisha'},
    {value: 'Punjab', label: 'Punjab'},
    {value: 'Rajasthan', label: 'Rajasthan'},
    {value: 'Sikkim', label: 'Sikkim'},
    {value: 'Tamil Nadu', label: 'Tamil Nadu'},
    {value: 'Telangana', label: 'Telangana'},
    {value: 'Tripura', label: 'Tripura'},
    {value: 'Uttar Pradesh', label: 'Uttar Pradesh'},
    {value: 'Uttarakhand', label: 'Uttarakhand'},
    {value: 'West Bengal', label: 'West Bengal'}
];

const districts = {
    'Andhra Pradesh': [
        {value: 'Anantapur', label: 'Anantapur'},
        {value: 'Chittoor', label: 'Chittoor'},
        {value: 'East Godavari', label: 'East Godavari'},
        {value: 'Guntur', label: 'Guntur'},
        {value: 'Krishna', label: 'Krishna'},
        {value: 'Kurnool', label: 'Kurnool'},
        {value: 'Nellore', label: 'Nellore'},
        {value: 'Prakasam', label: 'Prakasam'},
        {value: 'Srikakulam', label: 'Srikakulam'},
        {value: 'Visakhapatnam', label: 'Visakhapatnam'},
        {value: 'Vizianagaram', label: 'Vizianagaram'},
        {value: 'West Godavari', label: 'West Godavari'},
        {value: 'YSR Kadapa', label: 'YSR Kadapa'},
    ],
    'Arunachal Pradesh': [
        {value: 'Tawang', label: 'Tawang'},
        {value: 'West Kameng', label: 'West Kameng'},
        {value: 'East Kameng', label: 'East Kameng'},
        {value: 'Papum Pare', label: 'Papum Pare'},
        {value: 'Kurung Kumey', label: 'Kurung Kumey'},
        {value: 'Kra Daadi', label: 'Kra Daadi'},
        {value: 'Lower Subansiri', label: 'Lower Subansiri'},
        {value: 'Upper Subansiri', label: 'Upper Subansiri'},
        {value: 'West Siang', label: 'West Siang'},
        {value: 'East Siang', label: 'East Siang'},
        {value: 'Siang', label: 'Siang'},
        {value: 'Upper Siang', label: 'Upper Siang'},
        {value: 'Lower Siang', label: 'Lower Siang'},
        {value: 'Lower Dibang Valley', label: 'Lower Dibang Valley'},
        {value: 'Dibang Valley', label: 'Dibang Valley'},
        {value: 'Anjaw', label: 'Anjaw'},
        {value: 'Lohit', label: 'Lohit'},
        {value: 'Namsai', label: 'Namsai'},
        {value: 'Changlang', label: 'Changlang'},
        {value: 'Tirap', label: 'Tirap'},
        {value: 'Longding', label: 'Longding'}
    ],
    'Assam': [
        {value: 'Baksa', label: 'Baksa'},
        {value: 'Barpeta', label: 'Barpeta'},
        {value: 'Biswanath', label: 'Biswanath'},
        {value: 'Bongaigaon', label: 'Bongaigaon'},
        {value: 'Cachar', label: 'Cachar'},
        {value: 'Charaideo', label: 'Charaideo'},
        {value: 'Chirang', label: 'Chirang'},
        {value: 'Darrang', label: 'Darrang'},
        {value: 'Dhemaji', label: 'Dhemaji'},
        {value: 'Dhubri', label: 'Dhubri'},
        {value: 'Dibrugarh', label: 'Dibrugarh'},
        {value: 'Dima Hasao', label: 'Dima Hasao'},
        {value: 'Goalpara', label: 'Goalpara'},
        {value: 'Golaghat', label: 'Golaghat'},
        {value: 'Hailakandi', label: 'Hailakandi'},
        {value: 'Hojai', label: 'Hojai'},
        {value: 'Jorhat', label: 'Jorhat'},
        {value: 'Kamrup', label: 'Kamrup'},
        {value: 'Kamrup Metropolitan', label: 'Kamrup Metropolitan'},
        {value: 'Karbi Anglong', label: 'Karbi Anglong'},
        {value: 'Karimganj', label: 'Karimganj'},
        {value: 'Kokrajhar', label: 'Kokrajhar'},
        {value: 'Lakhimpur', label: 'Lakhimpur'},
        {value: 'Majuli', label: 'Majuli'},
        {value: 'Morigaon', label: 'Morigaon'},
        {value: 'Nagaon', label: 'Nagaon'},
        {value: 'Nalbari', label: 'Nalbari'},
        {value: 'Sivasagar', label: 'Sivasagar'},
        {value: 'Sonitpur', label: 'Sonitpur'},
        {value: 'South Salmara-Mankachar', label: 'South Salmara-Mankachar'},
        {value: 'Tinsukia', label: 'Tinsukia'},
        {value: 'Udalguri', label: 'Udalguri'},
        {value: 'West Karbi Anglong', label: 'West Karbi Anglong'}
    ],
    'Bihar': [
        {value: 'Araria', label: 'Araria'},
        {value: 'Arwal', label: 'Arwal'},
        {value: 'Aurangabad', label: 'Aurangabad'},
        {value: 'Banka', label: 'Banka'},
        {value: 'Begusarai', label: 'Begusarai'},
        {value: 'Bhagalpur', label: 'Bhagalpur'},
        {value: 'Bhojpur', label: 'Bhojpur'},
        {value: 'Buxar', label: 'Buxar'},
        {value: 'Darbhanga', label: 'Darbhanga'},
        {value: 'East Champaran', label: 'East Champaran'},
        {value: 'Gaya', label: 'Gaya'},
        {value: 'Gopalganj', label: 'Gopalganj'},
        {value: 'Jamui', label: 'Jamui'},
        {value: 'Jehanabad', label: 'Jehanabad'},
        {value: 'Kaimur', label: 'Kaimur'},
        {value: 'Katihar', label: 'Katihar'},
        {value: 'Khagaria', label: 'Khagaria'},
        {value: 'Kishanganj', label: 'Kishanganj'},
        {value: 'Lakhisarai', label: 'Lakhisarai'},
        {value: 'Madhepura', label: 'Madhepura'},
        {value: 'Madhubani', label: 'Madhubani'},
        {value: 'Munger', label: 'Munger'},
        {value: 'Muzaffarpur', label: 'Muzaffarpur'},
        {value: 'Nalanda', label: 'Nalanda'},
        {value: 'Nawada', label: 'Nawada'},
        {value: 'Patna', label: 'Patna'},
        {value: 'Purnia', label: 'Purnia'},
        {value: 'Rohtas', label: 'Rohtas'},
        {value: 'Saharsa', label: 'Saharsa'},
        {value: 'Samastipur', label: 'Samastipur'},
        {value: 'Saran', label: 'Saran'},
        {value: 'Sheikhpura', label: 'Sheikhpura'},
        {value: 'Sheohar', label: 'Sheohar'},
        {value: 'Sitamarhi', label: 'Sitamarhi'},
        {value: 'Siwan', label: 'Siwan'},
        {value: 'Supaul', label: 'Supaul'},
        {value: 'Vaishali', label: 'Vaishali'},
        {value: 'West Champaran', label: 'West Champaran'},
    ],
    'Chhattisgarh': [
        {value: 'Balod', label: 'Balod'},
        {value: 'Baloda Bazar', label: 'Baloda Bazar'},
        {value: 'Balrampur', label: 'Balrampur'},
        {value: 'Bastar', label: 'Bastar'},
        {value: 'Bemetara', label: 'Bemetara'},
        {value: 'Bijapur', label: 'Bijapur'},
        {value: 'Bilaspur', label: 'Bilaspur'},
        {value: 'Dantewada', label: 'Dantewada'},
        {value: 'Dhamtari', label: 'Dhamtari'},
        {value: 'Durg', label: 'Durg'},
        {value: 'Gariaband', label: 'Gariaband'},
        {value: 'Janjgir-Champa', label: 'Janjgir-Champa'},
        {value: 'Jashpur', label: 'Jashpur'},
        {value: 'Kabirdham', label: 'Kabirdham'},
        {value: 'Kanker', label: 'Kanker'},
        {value: 'Kondagaon', label: 'Kondagaon'},
        {value: 'Korba', label: 'Korba'},
        {value: 'Koriya', label: 'Koriya'},
        {value: 'Mahasamund', label: 'Mahasamund'},
        {value: 'Mungeli', label: 'Mungeli'},
        {value: 'Narayanpur', label: 'Narayanpur'},
        {value: 'Raigarh', label: 'Raigarh'},
        {value: 'Raipur', label: 'Raipur'},
        {value: 'Rajnandgaon', label: 'Rajnandgaon'},
        {value: 'Sukma', label: 'Sukma'},
        {value: 'Surajpur', label: 'Surajpur'},
        {value: 'Surguja', label: 'Surguja'},
    ],
    'Delhi': [
        {value: 'Central Delhi', label: 'Central Delhi'},
        {value: 'East Delhi', label: 'East Delhi'},
        {value: 'New Delhi', label: 'New Delhi'},
        {value: 'North Delhi', label: 'North Delhi'},
        {value: 'North East Delhi', label: 'North East Delhi'},
        {value: 'North West Delhi', label: 'North West Delhi'},
        {value: 'Shahdara', label: 'Shahdara'},
        {value: 'South Delhi', label: 'South Delhi'},
        {value: 'South East Delhi', label: 'South East Delhi'},
        {value: 'South West Delhi', label: 'South West Delhi'},
        {value: 'West Delhi', label: 'West Delhi'}
    ],
    'Goa': [
        {value: 'North Goa', label: 'North Goa'},
        {value: 'South Goa', label: 'South Goa'},
    ],
    'Gujarat': [
        {value: 'Ahmedabad', label: 'Ahmedabad'},
        {value: 'Amreli', label: 'Amreli'},
        {value: 'Anand', label: 'Anand'},
        {value: 'Aravalli', label: 'Aravalli'},
        {value: 'Banaskantha', label: 'Banaskantha'},
        {value: 'Bharuch', label: 'Bharuch'},
        {value: 'Bhavnagar', label: 'Bhavnagar'},
        {value: 'Botad', label: 'Botad'},
        {value: 'Chhota Udepur', label: 'Chhota Udepur'},
        {value: 'Dahod', label: 'Dahod'},
        {value: 'Dang', label: 'Dang'},
        {value: 'Devbhoomi Dwarka', label: 'Devbhoomi Dwarka'},
        {value: 'Gandhinagar', label: 'Gandhinagar'},
        {value: 'Gir Somnath', label: 'Gir Somnath'},
        {value: 'Jamnagar', label: 'Jamnagar'},
        {value: 'Junagadh', label: 'Junagadh'},
        {value: 'Kutch', label: 'Kutch'},
        {value: 'Kheda', label: 'Kheda'},
        {value: 'Mahisagar', label: 'Mahisagar'},
        {value: 'Mehsana', label: 'Mehsana'},
        {value: 'Morbi', label: 'Morbi'},
        {value: 'Narmada', label: 'Narmada'},
        {value: 'Navsari', label: 'Navsari'},
        {value: 'Panchmahal', label: 'Panchmahal'},
        {value: 'Patan', label: 'Patan'},
        {value: 'Porbandar', label: 'Porbandar'},
        {value: 'Rajkot', label: 'Rajkot'},
        {value: 'Sabarkantha', label: 'Sabarkantha'},
        {value: 'Surat', label: 'Surat'},
        {value: 'Surendranagar', label: 'Surendranagar'},
        {value: 'Tapi', label: 'Tapi'},
        {value: 'Vadodara', label: 'Vadodara'},
        {value: 'Valsad', label: 'Valsad'},
    ],
    'Haryana': [
        {value: 'Ambala', label: 'Ambala'},
        {value: 'Bhiwani', label: 'Bhiwani'},
        {value: 'Charkhi Dadri', label: 'Charkhi Dadri'},
        {value: 'Faridabad', label: 'Faridabad'},
        {value: 'Fatehabad', label: 'Fatehabad'},
        {value: 'Gurugram', label: 'Gurugram'},
        {value: 'Hisar', label: 'Hisar'},
        {value: 'Jhajjar', label: 'Jhajjar'},
        {value: 'Jind', label: 'Jind'},
        {value: 'Kaithal', label: 'Kaithal'},
        {value: 'Karnal', label: 'Karnal'},
        {value: 'Kurukshetra', label: 'Kurukshetra'},
        {value: 'Mahendragarh', label: 'Mahendragarh'},
        {value: 'Nuh', label: 'Nuh'},
        {value: 'Palwal', label: 'Palwal'},
        {value: 'Panchkula', label: 'Panchkula'},
        {value: 'Panipat', label: 'Panipat'},
        {value: 'Rewari', label: 'Rewari'},
        {value: 'Rohtak', label: 'Rohtak'},
        {value: 'Sirsa', label: 'Sirsa'},
        {value: 'Sonipat', label: 'Sonipat'},
        {value: 'Yamunanagar', label: 'Yamunanagar'},
    ],
    'Himachal Pradesh': [
        {value: 'Bilaspur', label: 'Bilaspur'},
        {value: 'Chamba', label: 'Chamba'},
        {value: 'Hamirpur', label: 'Hamirpur'},
        {value: 'Kangra', label: 'Kangra'},
        {value: 'Kinnaur', label: 'Kinnaur'},
        {value: 'Kullu', label: 'Kullu'},
        {value: 'Lahaul and Spiti', label: 'Lahaul and Spiti'},
        {value: 'Mandi', label: 'Mandi'},
        {value: 'Shimla', label: 'Shimla'},
        {value: 'Sirmaur', label: 'Sirmaur'},
        {value: 'Solan', label: 'Solan'},
        {value: 'Una', label: 'Una'},
    ],
    'Jammu Kashmir': [
        {value: 'Anantnag', label: 'Anantnag'},
        {value: 'Bandipora', label: 'Bandipora'},
        {value: 'Baramulla', label: 'Baramulla'},
        {value: 'Ganderbal', label: 'Ganderbal'},
        {value: 'Kulgam', label: 'Kulgam'},
        {value: 'Kupwara', label: 'Kupwara'},
        {value: 'Pulwama', label: 'Pulwama'},
        {value: 'Shopian', label: 'Shopian'},
        {value: 'Srinagar', label: 'Srinagar'},
    ],
    'Jharkhand': [
        {value: 'Bokaro', label: 'Bokaro'},
        {value: 'Chatra', label: 'Chatra'},
        {value: 'Deoghar', label: 'Deoghar'},
        {value: 'Dhanbad', label: 'Dhanbad'},
        {value: 'Dumka', label: 'Dumka'},
        {value: 'East Singhbhum', label: 'East Singhbhum'},
        {value: 'Garhwa', label: 'Garhwa'},
        {value: 'Giridih', label: 'Giridih'},
        {value: 'Godda', label: 'Godda'},
        {value: 'Gumla', label: 'Gumla'},
        {value: 'Hazaribagh', label: 'Hazaribagh'},
        {value: 'Jamtara', label: 'Jamtara'},
        {value: 'Khunti', label: 'Khunti'},
        {value: 'Koderma', label: 'Koderma'},
        {value: 'Latehar', label: 'Latehar'},
        {value: 'Lohardaga', label: 'Lohardaga'},
        {value: 'Pakur', label: 'Pakur'},
        {value: 'Palamu', label: 'Palamu'},
        {value: 'Ramgarh', label: 'Ramgarh'},
        {value: 'Ranchi', label: 'Ranchi'},
        {value: 'Sahibganj', label: 'Sahibganj'},
        {value: 'Seraikela Kharsawan', label: 'Seraikela Kharsawan'},
        {value: 'Simdega', label: 'Simdega'},
        {value: 'West Singhbhum', label: 'West Singhbhum'},
    ],
    'Karnataka': [
        {value: 'Bagalkot', label: 'Bagalkot'},
        {value: 'Bangalore Rural', label: 'Bangalore Rural'},
        {value: 'Bangalore Urban', label: 'Bangalore Urban'},
        {value: 'Belgaum', label: 'Belgaum'},
        {value: 'Bellary', label: 'Bellary'},
        {value: 'Bidar', label: 'Bidar'},
        {value: 'Bijapur', label: 'Bijapur'},
        {value: 'Chamarajanagar', label: 'Chamarajanagar'},
        {value: 'Chikkaballapur', label: 'Chikkaballapur'},
        {value: 'Chikkamagaluru', label: 'Chikkamagaluru'},
        {value: 'Chitradurga', label: 'Chitradurga'},
        {value: 'Dakshina Kannada', label: 'Dakshina Kannada'},
        {value: 'Davanagere', label: 'Davanagere'},
        {value: 'Dharwad', label: 'Dharwad'},
        {value: 'Gadag', label: 'Gadag'},
        {value: 'Gulbarga', label: 'Gulbarga'},
        {value: 'Hassan', label: 'Hassan'},
        {value: 'Haveri', label: 'Haveri'},
        {value: 'Kodagu', label: 'Kodagu'},
        {value: 'Kolar', label: 'Kolar'},
        {value: 'Koppal', label: 'Koppal'},
        {value: 'Mandya', label: 'Mandya'},
        {value: 'Mysore', label: 'Mysore'},
        {value: 'Raichur', label: 'Raichur'},
        {value: 'Ramanagara', label: 'Ramanagara'},
        {value: 'Shimoga', label: 'Shimoga'},
        {value: 'Tumkur', label: 'Tumkur'},
        {value: 'Udupi', label: 'Udupi'},
        {value: 'Uttara Kannada', label: 'Uttara Kannada'},
        {value: 'Yadgir', label: 'Yadgir'},
    ],
    'Kerala': [
        {value: 'Alappuzha', label: 'Alappuzha'},
        {value: 'Ernakulam', label: 'Ernakulam'},
        {value: 'Kannur', label: 'Kannur'},
        {value: 'Kollam', label: 'Kollam'},
        {value: 'Kottayam', label: 'Kottayam'},
        {value: 'Kozhikode', label: 'Kozhikode'},
        {value: 'Malappuram', label: 'Malappuram'},
        {value: 'Palakkad', label: 'Palakkad'},
        {value: 'Pathanamthitta', label: 'Pathanamthitta'},
        {value: 'Thiruvananthapuram', label: 'Thiruvananthapuram'},
        {value: 'Thrissur', label: 'Thrissur'},
        {value: 'Wayanad', label: 'Wayanad'},
    ],
    'Madhya Pradesh': [
        {value: 'Bhopal', label: 'Bhopal'},
        {value: 'Indore', label: 'Indore'},
        {value: 'Jabalpur', label: 'Jabalpur'},
        {value: 'Gwalior', label: 'Gwalior'},
        {value: 'Ujjain', label: 'Ujjain'},
        {value: 'Sagar', label: 'Sagar'},
        {value: 'Dewas', label: 'Dewas'},
        {value: 'Satna', label: 'Satna'},
        {value: 'Ratlam', label: 'Ratlam'},
        {value: 'Rewa', label: 'Rewa'},
        {value: 'Chhindwara', label: 'Chhindwara'},
        {value: 'Guna', label: 'Guna'},
    ],
    'Maharashtra': [
        {value: 'Ahmednagar', label: 'Ahmednagar'},
        {value: 'Akola', label: 'Akola'},
        {value: 'Amravati', label: 'Amravati'},
        {value: 'Beed', label: 'Beed'},
        {value: 'Bhandara', label: 'Bhandara'},
        {value: 'Buldhana', label: 'Buldhana'},
        {value: 'Chandrapur', label: 'Chandrapur'},
        {value: 'Chhatrapati Sambhaji Nagar', label: 'Chhatrapati Sambhaji Nagar'},
        {value: 'Dhule', label: 'Dhule'},
        {value: 'Gadchiroli', label: 'Gadchiroli'},
        {value: 'Gondia', label: 'Gondia'},
        {value: 'Hingoli', label: 'Hingoli'},
        {value: 'Jalgaon', label: 'Jalgaon'},
        {value: 'Jalna', label: 'Jalna'},
        {value: 'Kolhapur', label: 'Kolhapur'},
        {value: 'Latur', label: 'Latur'},
        {value: 'Mumbai City', label: 'Mumbai City'},
        {value: 'Mumbai Suburban', label: 'Mumbai Suburban'},
        {value: 'Nagpur', label: 'Nagpur'},
        {value: 'Nanded', label: 'Nanded'},
        {value: 'Nandurbar', label: 'Nandurbar'},
        {value: 'Nashik', label: 'Nashik'},
        {value: 'Osmanabad', label: 'Osmanabad'},
        {value: 'Palghar', label: 'Palghar'},
        {value: 'Parbhani', label: 'Parbhani'},
        {value: 'Pune', label: 'Pune'},
        {value: 'Raigad', label: 'Raigad'},
        {value: 'Ratnagiri', label: 'Ratnagiri'},
        {value: 'Sangli', label: 'Sangli'},
        {value: 'Satara', label: 'Satara'},
        {value: 'Sindhudurg', label: 'Sindhudurg'},
        {value: 'Solapur', label: 'Solapur'},
        {value: 'Thane', label: 'Thane'},
        {value: 'Wardha', label: 'Wardha'},
        {value: 'Washim', label: 'Washim'},
        {value: 'Yavatmal', label: 'Yavatmal'},
    ],
    'Manipur': [
        {value: 'Bishnupur', label: 'Bishnupur'},
        {value: 'Chandel', label: 'Chandel'},
        {value: 'Churachandpur', label: 'Churachandpur'},
        {value: 'Imphal East', label: 'Imphal East'},
        {value: 'Imphal West', label: 'Imphal West'},
        {value: 'Jiribam', label: 'Jiribam'},
        {value: 'Kakching', label: 'Kakching'},
        {value: 'Kamjong', label: 'Kamjong'},
        {value: 'Kangpokpi', label: 'Kangpokpi'},
        {value: 'Noney', label: 'Noney'},
        {value: 'Pherzawl', label: 'Pherzawl'},
        {value: 'Senapati', label: 'Senapati'},
        {value: 'Tamenglong', label: 'Tamenglong'},
        {value: 'Tengnoupal', label: 'Tengnoupal'},
        {value: 'Thoubal', label: 'Thoubal'},
        {value: 'Ukhrul', label: 'Ukhrul'}
    ],
    'Meghalaya': [
        {value: 'East Garo Hills', label: 'East Garo Hills'},
        {value: 'East Jaintia Hills', label: 'East Jaintia Hills'},
        {value: 'East Khasi Hills', label: 'East Khasi Hills'},
        {value: 'North Garo Hills', label: 'North Garo Hills'},
        {value: 'Ri Bhoi', label: 'Ri Bhoi'},
        {value: 'South Garo Hills', label: 'South Garo Hills'},
        {value: 'South West Garo Hills', label: 'South West Garo Hills'},
        {value: 'South West Khasi Hills', label: 'South West Khasi Hills'},
        {value: 'West Garo Hills', label: 'West Garo Hills'},
        {value: 'West Jaintia Hills', label: 'West Jaintia Hills'},
        {value: 'West Khasi Hills', label: 'West Khasi Hills'}
    ],
    'Mizoram': [
        {value: 'Aizawl', label: 'Aizawl'},
        {value: 'Champhai', label: 'Champhai'},
        {value: 'Kolasib', label: 'Kolasib'},
        {value: 'Lawngtlai', label: 'Lawngtlai'},
        {value: 'Lunglei', label: 'Lunglei'},
        {value: 'Mamit', label: 'Mamit'},
        {value: 'Saiha', label: 'Saiha'},
        {value: 'Serchhip', label: 'Serchhip'}
    ],
    'Nagaland': [
        {value: 'Dimapur', label: 'Dimapur'},
        {value: 'Kiphire', label: 'Kiphire'},
        {value: 'Kohima', label: 'Kohima'},
        {value: 'Longleng', label: 'Longleng'},
        {value: 'Mokokchung', label: 'Mokokchung'},
        {value: 'Mon', label: 'Mon'},
        {value: 'Peren', label: 'Peren'},
        {value: 'Phek', label: 'Phek'},
        {value: 'Tuensang', label: 'Tuensang'},
        {value: 'Wokha', label: 'Wokha'},
        {value: 'Zunheboto', label: 'Zunheboto'}
    ],
    'Odisha': [
        {value: 'Angul', label: 'Angul'},
        {value: 'Balangir', label: 'Balangir'},
        {value: 'Balasore', label: 'Balasore'},
        {value: 'Bargarh', label: 'Bargarh'},
        {value: 'Bhadrak', label: 'Bhadrak'},
        {value: 'Boudh', label: 'Boudh'},
        {value: 'Cuttack', label: 'Cuttack'},
        {value: 'Deogarh', label: 'Deogarh'},
        {value: 'Dhenkanal', label: 'Dhenkanal'},
        {value: 'Gajapati', label: 'Gajapati'},
        {value: 'Ganjam', label: 'Ganjam'},
        {value: 'Jagatsinghpur', label: 'Jagatsinghpur'},
        {value: 'Jajpur', label: 'Jajpur'},
        {value: 'Jharsuguda', label: 'Jharsuguda'},
        {value: 'Kalahandi', label: 'Kalahandi'},
        {value: 'Kandhamal', label: 'Kandhamal'},
        {value: 'Kendrapara', label: 'Kendrapara'},
        {value: 'Kendujhar (Keonjhar)', label: 'Kendujhar (Keonjhar)'},
        {value: 'Khurda', label: 'Khurda'},
        {value: 'Koraput', label: 'Koraput'},
        {value: 'Malkangiri', label: 'Malkangiri'},
        {value: 'Mayurbhanj', label: 'Mayurbhanj'},
        {value: 'Nabarangpur', label: 'Nabarangpur'},
        {value: 'Nayagarh', label: 'Nayagarh'},
        {value: 'Nuapada', label: 'Nuapada'},
        {value: 'Puri', label: 'Puri'},
        {value: 'Rayagada', label: 'Rayagada'},
        {value: 'Sambalpur', label: 'Sambalpur'},
        {value: 'Subarnapur (Sonepur)', label: 'Subarnapur (Sonepur)'},
        {value: 'Sundargarh', label: 'Sundargarh'}
    ],
    'Punjab': [
        {value: 'Amritsar', label: 'Amritsar'},
        {value: 'Barnala', label: 'Barnala'},
        {value: 'Bathinda', label: 'Bathinda'},
        {value: 'Faridkot', label: 'Faridkot'},
        {value: 'Fatehgarh Sahib', label: 'Fatehgarh Sahib'},
        {value: 'Fazilka', label: 'Fazilka'},
        {value: 'Ferozepur', label: 'Ferozepur'},
        {value: 'Gurdaspur', label: 'Gurdaspur'},
        {value: 'Hoshiarpur', label: 'Hoshiarpur'},
        {value: 'Jalandhar', label: 'Jalandhar'},
        {value: 'Kapurthala', label: 'Kapurthala'},
        {value: 'Ludhiana', label: 'Ludhiana'},
        {value: 'Mansa', label: 'Mansa'},
        {value: 'Moga', label: 'Moga'},
        {value: 'Muktsar', label: 'Muktsar'},
        {value: 'Pathankot', label: 'Pathankot'},
        {value: 'Patiala', label: 'Patiala'},
        {value: 'Rupnagar', label: 'Rupnagar'},
        {value: 'S.A.S. Nagar', label: 'S.A.S. Nagar'},
        {value: 'Sangrur', label: 'Sangrur'},
        {value: 'Shahid Bhagat Singh Nagar', label: 'Shahid Bhagat Singh Nagar'},
        {value: 'Tarn Taran', label: 'Tarn Taran'}
    ],
    'Rajasthan': [
        {value: 'Ajmer', label: 'Ajmer'},
        {value: 'Alwar', label: 'Alwar'},
        {value: 'Banswara', label: 'Banswara'},
        {value: 'Baran', label: 'Baran'},
        {value: 'Barmer', label: 'Barmer'},
        {value: 'Bharatpur', label: 'Bharatpur'},
        {value: 'Bhilwara', label: 'Bhilwara'},
        {value: 'Bikaner', label: 'Bikaner'},
        {value: 'Bundi', label: 'Bundi'},
        {value: 'Chittorgarh', label: 'Chittorgarh'},
        {value: 'Churu', label: 'Churu'},
        {value: 'Dausa', label: 'Dausa'},
        {value: 'Dholpur', label: 'Dholpur'},
        {value: 'Dungarpur', label: 'Dungarpur'},
        {value: 'Ganganagar', label: 'Ganganagar'},
        {value: 'Hanumangarh', label: 'Hanumangarh'},
        {value: 'Jaipur', label: 'Jaipur'},
        {value: 'Jaisalmer', label: 'Jaisalmer'},
        {value: 'Jalore', label: 'Jalore'},
        {value: 'Jhalawar', label: 'Jhalawar'},
        {value: 'Jhunjhunu', label: 'Jhunjhunu'},
        {value: 'Jodhpur', label: 'Jodhpur'},
        {value: 'Karauli', label: 'Karauli'},
        {value: 'Kota', label: 'Kota'},
        {value: 'Nagaur', label: 'Nagaur'},
        {value: 'Pali', label: 'Pali'},
        {value: 'Pratapgarh', label: 'Pratapgarh'},
        {value: 'Rajsamand', label: 'Rajsamand'},
        {value: 'Sawai Madhopur', label: 'Sawai Madhopur'},
        {value: 'Sikar', label: 'Sikar'},
        {value: 'Sirohi', label: 'Sirohi'},
        {value: 'Tonk', label: 'Tonk'},
        {value: 'Udaipur', label: 'Udaipur'}
    ],
    'Sikkim': [
        {value: 'East Sikkim', label: 'East Sikkim'},
        {value: 'West Sikkim', label: 'West Sikkim'},
        {value: 'South Sikkim', label: 'South Sikkim'},
        {value: 'North Sikkim', label: 'North Sikkim'}
    ],
    'Tamil Nadu': [
        {value: 'Ariyalur', label: 'Ariyalur'},
        {value: 'Chennai', label: 'Chennai'},
        {value: 'Coimbatore', label: 'Coimbatore'},
        {value: 'Cuddalore', label: 'Cuddalore'},
        {value: 'Dharmapuri', label: 'Dharmapuri'},
        {value: 'Dindigul', label: 'Dindigul'},
        {value: 'Erode', label: 'Erode'},
        {value: 'Kancheepuram', label: 'Kancheepuram'},
        {value: 'Kanyakumari', label: 'Kanyakumari'},
        {value: 'Karur', label: 'Karur'},
        {value: 'Krishnagiri', label: 'Krishnagiri'},
        {value: 'Madurai', label: 'Madurai'},
        {value: 'Nagapattinam', label: 'Nagapattinam'},
        {value: 'Namakkal', label: 'Namakkal'},
        {value: 'Nilgiris', label: 'Nilgiris'},
        {value: 'Perambalur', label: 'Perambalur'},
        {value: 'Pudukkottai', label: 'Pudukkottai'},
        {value: 'Ramanathapuram', label: 'Ramanathapuram'},
        {value: 'Salem', label: 'Salem'},
        {value: 'Sivaganga', label: 'Sivaganga'},
        {value: 'Thanjavur', label: 'Thanjavur'},
        {value: 'Theni', label: 'Theni'},
        {value: 'Thoothukudi', label: 'Thoothukudi'},
        {value: 'Tiruchirappalli', label: 'Tiruchirappalli'},
        {value: 'Tirunelveli', label: 'Tirunelveli'},
        {value: 'Tiruppur', label: 'Tiruppur'},
        {value: 'Tiruvallur', label: 'Tiruvallur'},
        {value: 'Tiruvannamalai', label: 'Tiruvannamalai'},
        {value: 'Tiruvarur', label: 'Tiruvarur'},
        {value: 'Vellore', label: 'Vellore'},
        {value: 'Viluppuram', label: 'Viluppuram'},
        {value: 'Virudhunagar', label: 'Virudhunagar'}
    ],
    'Telangana': [
        {value: 'Adilabad', label: 'Adilabad'},
        {value: 'Bhadradri Kothagudem', label: 'Bhadradri Kothagudem'},
        {value: 'Hyderabad', label: 'Hyderabad'},
        {value: 'Jagtial', label: 'Jagtial'},
        {value: 'Jangaon', label: 'Jangaon'},
        {value: 'Jayashankar Bhoopalpally', label: 'Jayashankar Bhoopalpally'},
        {value: 'Jogulamba Gadwal', label: 'Jogulamba Gadwal'},
        {value: 'Kamareddy', label: 'Kamareddy'},
        {value: 'Karimnagar', label: 'Karimnagar'},
        {value: 'Khammam', label: 'Khammam'},
        {value: 'Komaram Bheem Asifabad', label: 'Komaram Bheem Asifabad'},
        {value: 'Mahabubabad', label: 'Mahabubabad'},
        {value: 'Mahabubnagar', label: 'Mahabubnagar'},
        {value: 'Mancherial', label: 'Mancherial'},
        {value: 'Medak', label: 'Medak'},
        {value: 'Medchal-Malkajgiri', label: 'Medchal-Malkajgiri'},
        {value: 'Mulugu', label: 'Mulugu'},
        {value: 'Nagarkurnool', label: 'Nagarkurnool'},
        {value: 'Nalgonda', label: 'Nalgonda'},
        {value: 'Nirmal', label: 'Nirmal'},
        {value: 'Nizamabad', label: 'Nizamabad'},
        {value: 'Peddapalli', label: 'Peddapalli'},
        {value: 'Rajanna Sircilla', label: 'Rajanna Sircilla'},
        {value: 'Rangareddy', label: 'Rangareddy'},
        {value: 'Sangareddy', label: 'Sangareddy'},
        {value: 'Siddipet', label: 'Siddipet'},
        {value: 'Suryapet', label: 'Suryapet'},
        {value: 'Vikarabad', label: 'Vikarabad'},
        {value: 'Wanaparthy', label: 'Wanaparthy'},
        {value: 'Warangal Rural', label: 'Warangal Rural'},
        {value: 'Warangal Urban', label: 'Warangal Urban'},
        {value: 'Yadadri Bhuvanagiri', label: 'Yadadri Bhuvanagiri'}
    ],
    'Tripura': [
        {value: 'Dhalai', label: 'Dhalai'},
        {value: 'Gomati', label: 'Gomati'},
        {value: 'Khowai', label: 'Khowai'},
        {value: 'North Tripura', label: 'North Tripura'},
        {value: 'Sepahijala', label: 'Sepahijala'},
        {value: 'South Tripura', label: 'South Tripura'},
        {value: 'Unakoti', label: 'Unakoti'},
        {value: 'West Tripura', label: 'West Tripura'}
    ],
    'Uttar Pradesh': [
        {value: 'Agra', label: 'Agra'},
        {value: 'Aligarh', label: 'Aligarh'},
        {value: 'Allahabad', label: 'Allahabad'},
        {value: 'Ambedkar Nagar', label: 'Ambedkar Nagar'},
        {value: 'Amethi', label: 'Amethi'},
        {value: 'Amroha', label: 'Amroha'},
        {value: 'Auraiya', label: 'Auraiya'},
        {value: 'Azamgarh', label: 'Azamgarh'},
        {value: 'Baghpat', label: 'Baghpat'},
        {value: 'Bahraich', label: 'Bahraich'},
        {value: 'Ballia', label: 'Ballia'},
        {value: 'Balrampur', label: 'Balrampur'},
        {value: 'Banda', label: 'Banda'},
        {value: 'Barabanki', label: 'Barabanki'},
        {value: 'Bareilly', label: 'Bareilly'},
        {value: 'Basti', label: 'Basti'},
        {value: 'Bhadohi', label: 'Bhadohi'},
        {value: 'Bijnor', label: 'Bijnor'},
        {value: 'Budaun', label: 'Budaun'},
        {value: 'Bulandshahr', label: 'Bulandshahr'},
        {value: 'Chandauli', label: 'Chandauli'},
        {value: 'Chitrakoot', label: 'Chitrakoot'},
        {value: 'Deoria', label: 'Deoria'},
        {value: 'Etah', label: 'Etah'},
        {value: 'Etawah', label: 'Etawah'},
        {value: 'Faizabad', label: 'Faizabad'},
        {value: 'Farrukhabad', label: 'Farrukhabad'},
        {value: 'Fatehpur', label: 'Fatehpur'},
        {value: 'Firozabad', label: 'Firozabad'},
        {value: 'Gautam Buddha Nagar', label: 'Gautam Buddha Nagar'},
        {value: 'Ghaziabad', label: 'Ghaziabad'},
        {value: 'Ghazipur', label: 'Ghazipur'},
        {value: 'Gonda', label: 'Gonda'},
        {value: 'Gorakhpur', label: 'Gorakhpur'},
        {value: 'Hamirpur', label: 'Hamirpur'},
        {value: 'Hapur', label: 'Hapur'},
        {value: 'Hardoi', label: 'Hardoi'},
        {value: 'Hathras', label: 'Hathras'},
        {value: 'Jalaun', label: 'Jalaun'},
        {value: 'Jaunpur', label: 'Jaunpur'},
        {value: 'Jhansi', label: 'Jhansi'},
        {value: 'Kannauj', label: 'Kannauj'},
        {value: 'Kanpur Dehat', label: 'Kanpur Dehat'},
        {value: 'Kanpur Nagar', label: 'Kanpur Nagar'},
        {value: 'Kasganj', label: 'Kasganj'},
        {value: 'Kaushambi', label: 'Kaushambi'},
        {value: 'Kushinagar', label: 'Kushinagar'},
        {value: 'Lakhimpur Kheri', label: 'Lakhimpur Kheri'},
        {value: 'Lalitpur', label: 'Lalitpur'},
        {value: 'Lucknow', label: 'Lucknow'},
        {value: 'Maharajganj', label: 'Maharajganj'},
        {value: 'Mahoba', label: 'Mahoba'},
        {value: 'Mainpuri', label: 'Mainpuri'},
        {value: 'Mathura', label: 'Mathura'},
        {value: 'Mau', label: 'Mau'},
        {value: 'Meerut', label: 'Meerut'},
        {value: 'Mirzapur', label: 'Mirzapur'},
        {value: 'Moradabad', label: 'Moradabad'},
        {value: 'Muzaffarnagar', label: 'Muzaffarnagar'},
        {value: 'Pilibhit', label: 'Pilibhit'},
        {value: 'Pratapgarh', label: 'Pratapgarh'},
        {value: 'Rae Bareli', label: 'Rae Bareli'},
        {value: 'Rampur', label: 'Rampur'},
        {value: 'Saharanpur', label: 'Saharanpur'},
        {value: 'Sambhal', label: 'Sambhal'},
        {value: 'Sant Kabir Nagar', label: 'Sant Kabir Nagar'},
        {value: 'Shahjahanpur', label: 'Shahjahanpur'},
        {value: 'Shamli', label: 'Shamli'},
        {value: 'Shrawasti', label: 'Shrawasti'},
        {value: 'Siddharthnagar', label: 'Siddharthnagar'},
        {value: 'Sitapur', label: 'Sitapur'},
        {value: 'Sonbhadra', label: 'Sonbhadra'},
        {value: 'Sultanpur', label: 'Sultanpur'},
        {value: 'Unnao', label: 'Unnao'},
        {value: 'Varanasi', label: 'Varanasi'},
    ],
    'Uttarakhand': [
        {value: 'Almora', label: 'Almora'},
        {value: 'Bageshwar', label: 'Bageshwar'},
        {value: 'Chamoli', label: 'Chamoli'},
        {value: 'Champawat', label: 'Champawat'},
        {value: 'Dehradun', label: 'Dehradun'},
        {value: 'Haridwar', label: 'Haridwar'},
        {value: 'Nainital', label: 'Nainital'},
        {value: 'Pauri Garhwal', label: 'Pauri Garhwal'},
        {value: 'Pithoragarh', label: 'Pithoragarh'},
        {value: 'Rudraprayag', label: 'Rudraprayag'},
        {value: 'Tehri Garhwal', label: 'Tehri Garhwal'},
        {value: 'Udham Singh Nagar', label: 'Udham Singh Nagar'},
        {value: 'Uttarkashi', label: 'Uttarkashi'},
    ],
    'West Bengal': [
        {value: 'Alipurduar', label: 'Alipurduar'},
        {value: 'Bankura', label: 'Bankura'},
        {value: 'Birbhum', label: 'Birbhum'},
        {value: 'Cooch Behar', label: 'Cooch Behar'},
        {value: 'Dakshin Dinajpur', label: 'Dakshin Dinajpur'},
        {value: 'Darjeeling', label: 'Darjeeling'},
        {value: 'Hooghly', label: 'Hooghly'},
        {value: 'Howrah', label: 'Howrah'},
        {value: 'Jalpaiguri', label: 'Jalpaiguri'},
        {value: 'Jhargram', label: 'Jhargram'},
        {value: 'Kalimpong', label: 'Kalimpong'},
        {value: 'Kolkata', label: 'Kolkata'},
        {value: 'Malda', label: 'Malda'},
        {value: 'Murshidabad', label: 'Murshidabad'},
        {value: 'Nadia', label: 'Nadia'},
        {value: 'North 24 Parganas', label: 'North 24 Parganas'},
        {value: 'Paschim Bardhaman', label: 'Paschim Bardhaman'},
        {value: 'Paschim Medinipur', label: 'Paschim Medinipur'},
        {value: 'Purba Bardhaman', label: 'Purba Bardhaman'},
        {value: 'Purba Medinipur', label: 'Purba Medinipur'},
        {value: 'Purulia', label: 'Purulia'},
        {value: 'South 24 Parganas', label: 'South 24 Parganas'},
        {value: 'Uttar Dinajpur', label: 'Uttar Dinajpur'}
    ]
};

const pageSize = 3;

export default function Home() {

    const paperStyle = {paddingBottom: 0, padding: '20px 20px', width: 1000, margin: "20px auto"}
    const [customerId, setCustomerId] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [panCardNumber, setPanCardNumber] = useState('')
    const [activeStatus, setActiveStatus] = useState('')
    const [createdDate, setCreatedDate] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(true)
    const [isUpdateButtonVisible, setIsUpdateButtonVisible] = useState(false)
    const [popup, setPopup] = useState(false)
    const [selectedOption, setSelectedOption] = useState('customerId')
    const [searchText, setSearchText] = useState('')
    const [information, setInformation] = useState([])
    const [errorMessages, setErrorMessages] = useState([])
    const [selectedState, setSelectedState] = useState('Maharashtra')
    const [selectedDistrict, setSelectedDistrict] = useState('Chhatrapati Sambhaji Nagar')
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const classes = useStyles();

    const handlePost = async (e) => {
        e.preventDefault()

        const todayDate = new Date().toLocaleDateString('en-GB');
        const createdAndUpdatedBy = localStorage.getItem('userName');
        const addressDemo = selectedDistrict + ", " + selectedState;

        const data = {
            "customerName": customerName,
            "customerMobileNumber": mobileNumber,
            "customerPanCardNumber": panCardNumber,
            "customerActiveStatus": activeStatus,
            "customerAddress": addressDemo,
            "createdDate": todayDate,
            "createdBy": createdAndUpdatedBy,
            "updatedDate": todayDate,
            "updatedBy": createdAndUpdatedBy
        }

        try {
            await axios.post('http://localhost:5424/customer/data/post', data)
                .then(() => {
                    window.location.reload();
                })
        } catch (error) {
            setErrorMessages(error.response.data.messages.map((message) => (<div>{message.messages}</div>)));
            console.log(errorMessages);
            setPopup(true)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const id = customerId;
        const todayDate = new Date().toLocaleDateString('en-GB');
        const updatedBy = localStorage.getItem('userName');
        const addressDemo = selectedDistrict + ", " + selectedState;

        const data = {
            "customerName": customerName,
            "customerMobileNumber": mobileNumber,
            "customerPanCardNumber": panCardNumber,
            "customerActiveStatus": activeStatus,
            "customerAddress": addressDemo,
            "createdDate": createdDate,
            "createdBy": createdBy,
            "updatedDate": todayDate,
            "updatedBy": updatedBy
        }

        await axios.put('http://localhost:5424/customer/data/update/' + id, data)
            .then(() => {
                console.log(data)
                window.location.reload();
            })
            .catch(error => {
                setErrorMessages(error.response.data.messages.map((message) => (<div>{message.messages}</div>)));
                console.log(errorMessages);
                setPopup(true)
            })
    }

    const handleDelete = async (id) => {

        await axios.delete('http://localhost:5424/customer/data/delete/' + id)
            .then(() => {
                window.location.reload();
            })
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        let searchData = {};

        if (selectedOption === 'customerId') {
            searchData = {"customerId": searchText};
        } else if (selectedOption === 'customerName') {
            searchData = {"customerName": searchText};
        } else if (selectedOption === 'customerMobileNumber') {
            searchData = {"customerMobileNumber": searchText};
        } else if (selectedOption === 'customerPanCardNumber') {
            searchData = {"customerPanCardNumber": searchText};
        } else if (selectedOption === 'customerActiveStatus') {
            searchData = {"customerActiveStatus": searchText};
        } else if (selectedOption === 'createdDate') {
            searchData = {"createdDate": searchText};
        } else if (selectedOption === 'createdBy') {
            searchData = {"createdBy": searchText};
        } else if (selectedOption === 'updatedDate') {
            searchData = {"updatedDate": searchText};
        } else if (selectedOption === 'updatedBy') {
            searchData = {"updatedBy": searchText};
        }

        try {
            await axios.post('http://localhost:5424/customer/data/search', searchData)
                .then((result) => {
                    setInformation(result.data.data);
                    console.log(result.data.data)
                })
        } catch (error) {
            const messages = error.response.data.messages.map((message) => (<div>{message.messages}</div>));
            setErrorMessages(messages);
            setPopup(true)
        }
    };

    useEffect(() => {
        if (localStorage.getItem('userId').trim().length === 0 || localStorage.getItem('userName').trim().length === 0 || localStorage.getItem('userEmail').trim().length === 0 || localStorage.getItem('password').trim().length === 0) {
            window.location.href = 'http://localhost:3000/login';
        } else {
            fetch("http://localhost:5424/customer/data/get")
                .then(res => res.json())
                .then((result) => {
                    setInformation(result);
                    console.log(result)
                })
        }
    }, []);

    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
    }

    const handleUpdateToTextField = async (id, name, mobileNumber, panCardNumber, activeStatus, address, createdDate, createdBy) => {

        setIsSubmitButtonVisible(false);
        setIsUpdateButtonVisible(true);

        const locationArray = address.split(", ");
        const district = locationArray[0];
        const state = locationArray[1];

        setCustomerId(id)
        setCustomerName(name)
        setMobileNumber(mobileNumber)
        setPanCardNumber(panCardNumber)
        setActiveStatus(activeStatus)
        setSelectedState(state)
        setSelectedDistrict(district)
        setCreatedDate(createdDate)
        setCreatedBy(createdBy)

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const handleRadioChange = (event) => {
        setActiveStatus(event.target.value);
    };

    const getLabel = () => {
        switch (selectedOption) {
            case "customerId":
                return "Customer ID";
            case "customerName":
                return "Customer Name";
            case "customerMobileNumber":
                return "Customer Mobile Number";
            case "customerPanCardNumber":
                return "Customer PanCard Number";
            case "customerActiveStatus":
                return "Customer Active Status";
            case "createdDate":
                return "Created Date";
            case "createdBy":
                return "Created By";
            case "updatedDate":
                return "Updated Date";
            case "updatedBy":
                return "Updated By";
            default:
                return "Selected Option";
        }
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const handleClick = (index) => {
        setPage(index);
    };

    const renderPagination = () => {
        const pageButtons = [];
        for (let i = 0; i < Math.ceil(information.length / pageSize); i++) {
            pageButtons.push(
                <Button
                    key={i}
                    onClick={() => handleClick(i)}
                    disabled={i === page}
                    variant="outlined"
                    color="primary"
                    style={{margin: "5px"}}
                >
                    {i + 1}
                </Button>
            );
        }
        return pageButtons;
    };

    const renderTableRows = () => {
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        return information.slice(startIndex, endIndex).map((info) => (
            <TableRow key={info.id}>
                <TableCell>{info.customerId}</TableCell>
                <TableCell>{info.customerName}</TableCell>
                <TableCell>{info.customerMobileNumber}</TableCell>
                <TableCell>{info.customerPanCardNumber}</TableCell>
                <TableCell>{info.customerActiveStatus}</TableCell>
                <TableCell>{info.customerAddress}</TableCell>
                <TableCell>{info.createdDate}</TableCell>
                <TableCell>{info.createdBy}</TableCell>
                <TableCell>{info.updatedDate}</TableCell>
                <TableCell>{info.updatedBy}</TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(info.customerId)}
                    >
                        Delete
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            handleUpdateToTextField(
                                info.customerId,
                                info.customerName,
                                info.customerMobileNumber,
                                info.customerPanCardNumber,
                                info.customerActiveStatus,
                                info.customerAddress,
                                info.createdDate,
                                info.createdBy
                            )
                        }
                    >
                        Update
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

    const handleSort = (columnName) => {
        const sortedInformation = information.sort((a, b) => {
            if (a[columnName] < b[columnName]) {
                return sortOrder === "asc" ? -1 : 1;
            }
            if (a[columnName] > b[columnName]) {
                return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
        });
        setInformation(sortedInformation);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (<Container>
        <div className={classes.root}>
            <ButtonAppBar/>
        </div>
        <Paper elevation={3} style={paperStyle}>
            <Typography variant="h2" className={classes.heading}>Enter Customer Data</Typography>
            <br/>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Customer Name" variant="outlined" fullWidth
                           value={customerName}
                           onChange={(e) => setCustomerName(e.target.value)}
                />
                <br/><br/>
                <TextField id="outlined-basic" label="Mobile Number" variant="outlined" fullWidth
                           value={mobileNumber}
                           onChange={(e) => setMobileNumber(e.target.value)}
                />
                <br/><br/>
                <TextField
                    id="outlined-basic"
                    label="PanCard Number"
                    variant="outlined"
                    fullWidth
                    value={panCardNumber}
                    onChange={(e) => setPanCardNumber(e.target.value.toUpperCase())}
                />
                <br/><br/>
                <FormControl>
                    <FormLabel id="activeStatus">Active Status</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="activeStatus"
                        name="Active Status"
                        value={activeStatus} onChange={handleRadioChange}
                    >
                        <FormControlLabel value="True" control={<Radio/>} label="True"/>
                        <FormControlLabel value="False" control={<Radio/>} label="False"/>
                    </RadioGroup>
                </FormControl>
                <br/><br/>
                <Box width={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="state-native-select">State</InputLabel>
                            <Select
                                value={selectedState}
                                onChange={handleStateChange}
                                className={classes.root}
                                inputProps={{
                                    name: 'state',
                                    id: 'state-native-select',
                                }}
                                fullWidth
                            >
                                <MenuItem aria-label="None" value=""/>
                                {states.map((state) => (
                                    <MenuItem key={state.value} value={state.value}>
                                        {state.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="district-native-select">District</InputLabel>
                            <Select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                className={classes.root}
                                inputProps={{
                                    name: 'district',
                                    id: 'district-native-select',
                                }}
                                disabled={!selectedState}
                                fullWidth
                            >
                                <MenuItem aria-label="None" value=""/>
                                {districts[selectedState] &&
                                    districts[selectedState].map((district) => (
                                        <MenuItem key={district.value} value={district.value}>
                                            {district.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Box>
                <br/><br/>
                {isSubmitButtonVisible && <Button variant="contained" color="secondary" onClick={handlePost} fullWidth>
                    Submit
                </Button>}
                <Popup trigger={popup} setTrigger={setPopup}>
                    <br/>
                    <label>{errorMessages}</label>
                </Popup>
                <br/><br/>
                {isUpdateButtonVisible && <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
                    Update
                </Button>}
                <br/><br/>
                {!isSubmitButtonVisible && (<Button variant="contained" color="secondary" onClick={handlePost} fullWidth
                                                    style={{visibility: "hidden", opacity: 0}}>Submit</Button>)}
                {!isUpdateButtonVisible && (<Button variant="contained" color="primary" onClick={handleUpdate} fullWidth
                                                    style={{visibility: "hidden", opacity: 0}}>Update</Button>)}
                <br/><br/>
            </form>
        </Paper>

        <Paper elevation={3} style={paperStyle}>
            <Typography variant="h2" className={classes.heading}>Filter by search</Typography>
            <br/>
            <Box width={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            className={classes.root}
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem value="customerId">Customer ID</MenuItem>
                            <MenuItem value="customerName">Customer Name</MenuItem>
                            <MenuItem value="customerMobileNumber">Customer Mobile Number</MenuItem>
                            <MenuItem value="customerPanCardNumber">Customer PanCard Number</MenuItem>
                            <MenuItem value="customerActiveStatus">Customer Active Status</MenuItem>
                            <MenuItem value="createdDate">Created Date</MenuItem>
                            <MenuItem value="createdBy">Created By</MenuItem>
                            <MenuItem value="updatedDate">Updated Date</MenuItem>
                            <MenuItem value="updatedBy">Updated By</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic"
                                   label={getLabel()}
                                   variant="outlined" fullWidth
                                   value={searchText}
                                   onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={handleSearch} fullWidth>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>

        <Paper elevation={3} style={paperStyle}>
            <Typography variant="h2" className={classes.heading}>Saved Information in Database</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div
                                    style={{display: "flex", alignItems: "center", cursor: "pointer"}}
                                    onClick={() => handleSort("customerId")}
                                >
                                    Customer Id
                                    {sortOrder === "asc" ? (
                                        <ArrowDropDownIcon fontSize="small"/>
                                    ) : (
                                        <ArrowDropUpIcon fontSize="small"/>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>PanCard Number</TableCell>
                            <TableCell>Active Status</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableRows()}</TableBody>
                </Table>
            </TableContainer>
            <div style={{textAlign: "center", margin: "10px"}}>
                {renderPagination()}
            </div>
        </Paper>
    </Container>)
}