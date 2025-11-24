import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { JOB_LISTINGS } from '../constants';

const Jobs: React.FC = () => {
  return (
    <div className="p-4 pb-24 space-y-4 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold dark:text-white">Latest Jobs</h2>
            <button className="text-ethio-green text-sm font-medium">View All</button>
        </div>

        <div className="space-y-3">
            {JOB_LISTINGS.map(job => (
                <div key={job.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{job.title}</h3>
                            <p className="text-ethio-green font-medium">{job.company}</p>
                        </div>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md">{job.type}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-3 mb-4">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} /> {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign size={14} /> {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} /> {job.postedAt}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex-1 bg-ethio-green/10 text-ethio-green py-2 rounded-lg font-semibold hover:bg-ethio-green hover:text-white transition-colors">
                            Apply Now
                        </button>
                        <button className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 py-2 rounded-lg font-medium">
                            Save
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Jobs;
