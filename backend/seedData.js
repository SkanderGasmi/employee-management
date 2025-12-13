const mongoose = require('mongoose');
require('dotenv').config();

// Suppress deprecation warnings
mongoose.set('strictQuery', true);

const MONGODB_URI = process.env.MONGODB_URI || 
  'mongodb://admin:password@localhost:27017/employee_management?authSource=admin';

// Department Schema
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Department = mongoose.model('Department', departmentSchema);
const Employee = mongoose.model('Employee', employeeSchema);

const departments = [
    {
        name: 'General Dentistry',
        description: 'General dental care and checkups'
    },
    {
        name: 'Orthodontics',
        description: 'Braces and teeth alignment treatments'
    },
    {
        name: 'Pediatric Dentistry',
        description: 'Dental care for children'
    },
    {
        name: 'Oral Surgery',
        description: 'Tooth extractions and oral surgeries'
    },
    {
        name: 'Periodontics',
        description: 'Gum disease treatment'
    }
];

const seedDatabase = async () => {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Department.deleteMany({});
        await Employee.deleteMany({});

        // Insert departments
        console.log('🌱 Seeding departments...');
        const createdDepartments = await Department.insertMany(departments);
        console.log(`✅ Created ${createdDepartments.length} departments`);

        // Create employees for each department
        const employees = [
            {
                name: 'Sarah',
                surname: 'Johnson',
                position: 'Lead Dentist',
                department: createdDepartments[0]._id
            },
            {
                name: 'Michael',
                surname: 'Chen',
                position: 'Dental Hygienist',
                department: createdDepartments[0]._id
            },
            {
                name: 'Robert',
                surname: 'Williams',
                position: 'Orthodontist',
                department: createdDepartments[1]._id
            },
            {
                name: 'Emily',
                surname: 'Davis',
                position: 'Pediatric Dentist',
                department: createdDepartments[2]._id
            },
            {
                name: 'James',
                surname: 'Wilson',
                position: 'Oral Surgeon',
                department: createdDepartments[3]._id
            },
            {
                name: 'Lisa',
                surname: 'Martinez',
                position: 'Periodontist',
                department: createdDepartments[4]._id
            },
            {
                name: 'David',
                surname: 'Brown',
                position: 'Dental Assistant',
                department: createdDepartments[0]._id
            },
            {
                name: 'Jessica',
                surname: 'Taylor',
                position: 'Office Manager',
                department: createdDepartments[0]._id
            }
        ];

        console.log('👥 Seeding employees...');
        await Employee.insertMany(employees);
        console.log(`✅ Created ${employees.length} employees`);

        // Get final counts
        const deptCount = await Department.countDocuments();
        const empCount = await Employee.countDocuments();

        console.log('\n🎉 Database seeding completed!');
        console.log(`📊 Summary:`);
        console.log(`   Departments: ${deptCount}`);
        console.log(`   Employees: ${empCount}`);
        console.log('\nYou can now start the server with: npm start');

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        console.error(error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    process.exit(1);
});

seedDatabase();