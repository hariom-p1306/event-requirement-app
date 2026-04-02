"use client";
import { useState } from "react";

export default function CreateEvent() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    date: "",
    location: "",
    venue: "",
    category: "",
    details: {},
  });

  // Step 1 input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Step 2 input handler (PRO version)
  const handleDetailsChange = (e) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Submit
  const handleSubmit = async () => {
    // ✅ Validation here (correct place)
    if (!formData.eventName || !formData.category) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://event-requirement-app.onrender.com/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Saved:", data);

      setSuccess(true);

      // Reset form
      setFormData({
        eventName: "",
        eventType: "",
        date: "",
        location: "",
        venue: "",
        category: "",
        details: {},
      });

      setStep(1);
    } catch (error) {
      console.error(error);
      alert("Error saving event");
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-green-500">
          Event Created Successfully 🎉
        </h1>

        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
          }}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Another Event
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-xl mx-auto">

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-6">Create Event</h1>

          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="eventType"
            placeholder="Event Type"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="venue"
            placeholder="Venue (optional)"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <select
            name="category"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="planner">Event Planner</option>
            <option value="performer">Performer</option>
            <option value="crew">Crew</option>
          </select>

          <button
            onClick={() => setStep(2)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-4">Additional Details</h2>

          {/* Planner */}
          {formData.category === "planner" && (
            <>
              <input
                type="number"
                name="budget"
                placeholder="Budget"
                className="w-full border p-2 mb-3"
                onChange={handleDetailsChange}
              />
              <input
                type="number"
                name="guestCount"
                placeholder="Guest Count"
                className="w-full border p-2 mb-3"
                onChange={handleDetailsChange}
              />
            </>
          )}

          {/* Performer */}
          {formData.category === "performer" && (
            <>
              <input
                type="text"
                name="genre"
                placeholder="Genre"
                className="w-full border p-2 mb-3"
                onChange={handleDetailsChange}
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                className="w-full border p-2 mb-3"
                onChange={handleDetailsChange}
              />
            </>
          )}

          {/* Crew */}
          {formData.category === "crew" && (
            <>
              <input
                type="text"
                name="role"
                placeholder="Role"
                className="w-full border p-2 mb-3"
                onChange={handleDetailsChange}
              />
              <input
                type="number"
                name="teamSize"
                placeholder="Team Size"
                className="w-full border p-2 mb-3"
                onChange={handleDetailsChange}
              />
            </>
          )}

          <button
            onClick={() => setStep(1)}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}