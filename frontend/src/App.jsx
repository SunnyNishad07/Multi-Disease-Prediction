import { useState, useEffect, useRef } from 'react'
import { diseases } from './diseaseData'

const generalTips = [
  {
    title: 'Stay Hydrated',
    icon: '💧',
    description: 'Drinking enough water every day is crucial to regulate body temperature, keep joints lubricated, and deliver nutrients to cells.',
  },
  {
    title: 'Prioritize Sleep',
    icon: '🌙',
    description: 'Quality sleep is essential for physical and mental restoration. Aim for 7-9 hours of uninterrupted sleep per night.',
  },
  {
    title: 'Mindful Stress Reduction',
    icon: '🧘',
    description: 'Chronic stress can take a toll on your immune system. Practice deep breathing, meditation, or simply taking time away from screens.',
  },
  {
    title: 'Exercise Daily',
    icon: '🏃',
    description: 'Engage in at least 30 minutes of physical activity each day to strengthen your heart, boost your mood, and maintain a healthy weight.',
  },
  {
    title: 'Eat Whole Foods',
    icon: '🥗',
    description: 'Prioritize fresh vegetables, fruits, whole grains, and lean proteins over highly processed foods to give your body the best fuel.',
  },
  {
    title: 'Stay Socially Connected',
    icon: '🤝',
    description: 'Strong relationships and regular social interaction can lower stress levels and improve both mental and physical longevity.',
  }
]

const diseaseEntries = Object.entries(diseases)

const wellnessNotes = [
  {
    title: 'Diabetes',
    icon: '◈',
    text: 'Balanced meals, regular movement, healthy sleep, and routine glucose checks can support blood-sugar management.',
    details: 'Diabetes affects how your body turns food into energy. Managing it effectively involves understanding how different foods affect your blood sugar levels and staying active.',
    clue: 'Start by incorporating more high-fiber foods into your diet and going for a 15-minute walk after meals to help stabilize glucose levels naturally.',
    accent: 'teal',
  },
  {
    title: 'Heart Health',
    icon: '♥',
    text: 'Focus on movement, nutritious food, stress management, and regular blood-pressure or cholesterol reviews.',
    details: 'Your heart beats over 100,000 times a day. Protecting it means maintaining a strong circulatory system through regular cardiovascular exercise and minimizing saturated fats.',
    clue: 'Try adopting the "Mediterranean diet" principles—more olive oil, fish, and nuts—and aim for at least 30 minutes of moderate aerobic activity daily.',
    accent: 'coral',
  },
  {
    title: 'Parkinson’s',
    icon: '⌁',
    text: 'Keep regular medical follow-ups and discuss new movement, voice, sleep, or balance changes with a clinician.',
    details: 'Parkinson’s involves changes in the brain that affect movement and coordination. Early awareness of subtle changes in handwriting, smell, or sleep patterns is key.',
    clue: 'Engage in activities that challenge both your body and mind simultaneously, such as dancing, tai chi, or specialized physical therapy exercises.',
    accent: 'violet',
  },
]

function ScrollReveal({ children, className = '', style = {} }) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting)
      })
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' })

    if (domRef.current) observer.observe(domRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={domRef} className={`reveal-blur ${isVisible ? 'is-visible' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}

function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false)

  function submit(event) {
    event.preventDefault()
    onLogin()
  }

  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="floating-shapes">
          <span>✚</span>
          <span>♥</span>
          <span>♥</span>
          <span>⚕</span>
          <span>💊</span>
          <span>💊</span>
          <span>⌁</span>
          <span>✚</span>
        </div>
        <p className="eyebrow">Your Wellness Journey Starts Here</p>
        <h1>Empower your health.<br /><span>Embrace a better life.</span></h1>
        <p>
          CareConnect brings educational health screening and everyday wellness guidance
          together in one simple space to inspire mindful living.
        </p>

        <div className="login-points">
          <span>✦ Discover insights about your well-being</span>
          <span>✦ Track and understand health patterns</span>
          <span>✦ Prioritize your care with confidence</span>
        </div>
      </section>

      <section className="login-card-wrap">
        <form className="login-card" onSubmit={submit}>
          <button className="brand login-brand" type="button">
            <span>✦</span> Care<span>Connect</span>
          </button>

          <div className="login-heading">
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to your health space</h2>
            <p>Use any email and password for this project demo.</p>
          </div>

          <label>
            Email address
            <input type="email" placeholder="you@example.com" required />
          </label>

          <label>
            Password
            <div className="password-field">
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button className="primary login-button" type="submit">
            Enter CareConnect <span>→</span>
          </button>

          <p className="login-note">
            This is an educational project, not a medical service.
          </p>
        </form>
      </section>
    </main>
  )
}

function NavBar({ activePage, setActivePage, onLogout }) {
  const navigation = [
    ['home', 'Home'],
    ['dashboard', 'Dashboard'],
    ['guide', 'Health Guide'],
    ['lab', 'Lab Tests'],
    ['nearby', 'Nearby Care'],
  ]

  return (
    <header className="app-header">
      <button className="brand" onClick={() => setActivePage('home')}>
        <span>✦</span> Care<span>Connect</span>
      </button>

      <nav className="nav-links">
        {navigation.map(([page, label]) => (
          <button
            key={page}
            className={activePage === page ? 'nav-link active' : 'nav-link'}
            onClick={() => setActivePage(page)}
          >
            {label}
          </button>
        ))}
      </nav>

      <button className="profile-button" onClick={onLogout}>
        <span>SS</span>
        <small>Sign out</small>
      </button>
    </header>
  )
}

function HomePage({ openDashboard, openGuide }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.body.classList.add('theme-alt')
        } else {
          document.body.classList.remove('theme-alt')
        }
      })
    }, { threshold: 0.1, rootMargin: '-20% 0px -20% 0px' })

    const target = document.getElementById('health-guide-section')
    if (target) observer.observe(target)

    return () => {
      document.body.classList.remove('theme-alt')
      observer.disconnect()
    }
  }, [])

  return (
    <main className="site-page home-page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">Your health, made easier to understand</p>
          <h1>Small checks today.<br /><span>Better awareness tomorrow.</span></h1>
          <p className="hero-copy">
            Explore educational prediction models, understand everyday health habits,
            and take a more informed approach to your wellbeing.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={openDashboard}>
              Explore dashboard <span>→</span>
            </button>
            <button className="secondary" onClick={openGuide}>
              View health guide
            </button>
          </div>
        </div>
        <div className="home-hero-panel">
          <p className="eyebrow">CareConnect at a glance</p>
          <div className="panel-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">◈</span>
              <div>
                <strong>3 Models</strong>
                <p>Diabetes, Heart Disease, Parkinson’s</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">⌁</span>
              <div>
                <strong>43 Inputs</strong>
                <p>Clinical & voice measurements</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">✚</span>
              <div>
                <strong>Nearby Care</strong>
                <p>Find hospitals around you</p>
              </div>
            </div>
          </div>

          <hr className="panel-divider" />

          <p className="eyebrow">How it works</p>
          <div className="panel-steps">
            <div className="panel-step">
              <div className="step-indicator">
                <span className="step-num">01</span>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <strong>Choose a model</strong>
                <p>Select the health model you want to explore.</p>
              </div>
            </div>
            <div className="panel-step">
              <div className="step-indicator">
                <span className="step-num">02</span>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <strong>Enter your inputs</strong>
                <p>Provide the requested health or voice measurements.</p>
              </div>
            </div>
            <div className="panel-step">
              <div className="step-indicator">
                <span className="step-num">03</span>
              </div>
              <div className="step-content">
                <strong>Understand the result</strong>
                <p>Receive an educational prediction and helpful guidance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="stats-row">
          <article><strong>3</strong><span>Educational screening models</span></article>
          <article><strong>43</strong><span>Clinical & voice input values</span></article>
          <article><strong>1</strong><span>Simple place to learn and screen</span></article>
        </section>
      </ScrollReveal>

      <section id="health-guide-section" className="wellness-section">
        <ScrollReveal>
          <div className="section-title">
            <div>
              <p className="eyebrow">Everyday health guide</p>
              <h2>Build healthier patterns</h2>
            </div>
            <p>Small lifestyle choices can matter. These notes are general education and do not replace medical advice.</p>
          </div>
        </ScrollReveal>

        <div className="wellness-grid">
          {wellnessNotes.map((note, idx) => (
            <ScrollReveal key={note.title} style={{ transitionDelay: `${idx * 0.15}s` }}>
              <article className={`wellness-card extended-card ${note.accent}`}>
                <span className="wellness-icon">{note.icon}</span>
                <h3>{note.title}</h3>
                <p className="wellness-main-text">{note.text}</p>

                <div className="wellness-extended">
                  <p className="wellness-details">{note.details}</p>
                  <div className="wellness-clue">
                    <strong>💡 Pro Tip:</strong> {note.clue}
                  </div>
                </div>

                <button onClick={openGuide}>Read guidance <span>→</span></button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="wellness-section tips-section" style={{ marginTop: '90px' }}>
        <ScrollReveal>
          <div className="section-title">
            <div>
              <p className="eyebrow">Lifestyle & Prevention</p>
              <h2>Everyday Habits for Longevity</h2>
            </div>
            <p>Incorporate these simple, foundational habits into your daily routine to build a stronger baseline for your overall well-being.</p>
          </div>
        </ScrollReveal>

        <div className="wellness-grid">
          {generalTips.map((tip, idx) => (
            <ScrollReveal key={tip.title} style={{ transitionDelay: `${idx * 0.15}s` }}>
              <article className="wellness-card">
                <span className="wellness-icon" style={{ background: '#f0f5f4', color: '#13886e' }}>{tip.icon}</span>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  )
}

function DashboardPage({ selectDisease }) {
  return (
    <main className="site-page dashboard-page">
      <section className="page-intro">
        <p className="eyebrow">Prediction dashboard</p>
        <h1>Choose a health check</h1>
        <p>
          Select a model, enter the requested values, and receive an educational
          prediction from your existing FastAPI model.
        </p>
      </section>

      <div className="model-grid">
        {diseaseEntries.map(([key, disease]) => (
          <button
            className={`model-card ${disease.accent}`}
            key={key}
            onClick={() => selectDisease(key)}
          >
            <span className="card-icon">{disease.icon}</span>
            <div>
              <strong>{disease.shortTitle}</strong>
              <small>{disease.fields.length} input values</small>
              <p>{disease.description}</p>
            </div>
            <span className="card-arrow">→</span>
          </button>
        ))}

        <article className="future-card dashboard-future">
          <span className="future-icon">◌</span>
          <div>
            <strong>Brain Tumor</strong>
            <small>Coming in Phase 2</small>
            <p>MRI image analysis</p>
          </div>
        </article>
      </div>
    </main>
  )
}

function HealthGuidePage() {
  return (
    <main className="site-page guide-page">
      <section className="page-intro">
        <p className="eyebrow">Health guide</p>
        <h1>Learn before you screen</h1>
        <p>General awareness notes to help you understand the health topics represented in this project.</p>
      </section>

      <div className="guide-list">
        {wellnessNotes.map((note) => (
          <article className={`guide-card ${note.accent}`} key={note.title}>
            <span className="wellness-icon">{note.icon}</span>
            <div>
              <h2>{note.title}</h2>
              <p>{note.text}</p>
              <small>For concerns, symptoms, or treatment decisions, speak with a qualified healthcare professional.</small>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

function LabTestsPage({ openDashboard }) {
  return (
    <main className="site-page lab-page">
      <section className="page-intro">
        <p className="eyebrow">Lab-test awareness</p>
        <h1>Understand your inputs</h1>
        <p>
          The prediction forms use health measurements from the project datasets.
          They are not a replacement for professional laboratory testing.
        </p>
      </section>

      <div className="lab-grid">
        <article><span>01</span><h2>Diabetes inputs</h2><p>Glucose, blood pressure, BMI, insulin, age, and related values are used in this model.</p></article>
        <article><span>02</span><h2>Heart inputs</h2><p>Heart rate, cholesterol, blood pressure, ECG-related values, and other clinical measurements are used.</p></article>
        <article><span>03</span><h2>Voice inputs</h2><p>Parkinson’s screening uses voice-frequency and vocal-variation measurements from the dataset.</p></article>
      </div>

      <button className="primary" onClick={openDashboard}>
        Go to dashboard <span>→</span>
      </button>
    </main>
  )
}

function distanceInKm(lat1, lon1, lat2, lon2) {
  const radius = 6371
  const toRadians = (value) => (value * Math.PI) / 180
  const latDistance = toRadians(lat2 - lat1)
  const lonDistance = toRadians(lon2 - lon1)

  const calculation =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(lonDistance / 2) ** 2

  return radius * 2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation))
}

function NearbyCarePage() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [hospitals, setHospitals] = useState([])

  function findHospitals() {
    if (!navigator.geolocation) {
      setStatus('error')
      setMessage('Your browser does not support location access.')
      return
    }

    setStatus('loading')
    setMessage('')
    setHospitals([])

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        const query = `
          [out:json][timeout:20];
          (
            node["amenity"="hospital"](around:5000,${latitude},${longitude});
            way["amenity"="hospital"](around:5000,${latitude},${longitude});
            relation["amenity"="hospital"](around:5000,${latitude},${longitude});
          );
          out center tags;
        `

        try {
          const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({ data: query }),
          })

          if (!response.ok) {
            throw new Error('The hospital search is busy. Please try again shortly.')
          }

          const data = await response.json()

          const nearbyHospitals = data.elements
            .map((place) => {
              const hospitalLat = place.lat ?? place.center?.lat
              const hospitalLon = place.lon ?? place.center?.lon

              if (hospitalLat == null || hospitalLon == null) {
                return null
              }

              const address =
                place.tags?.['addr:full'] ||
                [
                  place.tags?.['addr:housenumber'],
                  place.tags?.['addr:street'],
                  place.tags?.['addr:city'],
                ]
                  .filter(Boolean)
                  .join(', ') ||
                'Address not available'

              return {
                id: `${place.type}-${place.id}`,
                name: place.tags?.name || 'Unnamed hospital',
                address,
                distance: distanceInKm(latitude, longitude, hospitalLat, hospitalLon),
                mapUrl: `https://www.openstreetmap.org/?mlat=${hospitalLat}&mlon=${hospitalLon}#map=17/${hospitalLat}/${hospitalLon}`,
              }
            })
            .filter(Boolean)
            .sort((first, second) => first.distance - second.distance)
            .slice(0, 5)

          setHospitals(nearbyHospitals)
          setStatus('success')
        } catch (error) {
          setStatus('error')
          setMessage(error.message || 'Unable to search for nearby hospitals.')
        }
      },
      () => {
        setStatus('error')
        setMessage('Location permission was not granted. Please allow it and try again.')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <main className="site-page nearby-page">
      <section className="page-intro">
        <p className="eyebrow">Nearby care</p>
        <h1>Hospitals around you</h1>
        <p>
          Allow your location to find nearby hospitals within approximately 5 km.
          Results are provided by OpenStreetMap and are for general information only.
        </p>
      </section>

      <section className="nearby-search-card">
        <span className="nearby-symbol">⌖</span>
        <div>
          <h2>Find nearby hospitals</h2>
          <p>Your location is used only for this search and is not saved by CareConnect.</p>
        </div>

        <button className="primary" onClick={findHospitals} disabled={status === 'loading'}>
          {status === 'loading' ? 'Searching…' : 'Use my location'} <span>→</span>
        </button>
      </section>

      {status === 'error' && <p className="nearby-error">{message}</p>}

      {status === 'success' && (
        <section className="hospital-results">
          <div className="results-heading">
            <div>
              <p className="eyebrow">Search results</p>
              <h2>Nearby hospitals</h2>
            </div>
            <p>{hospitals.length} result{hospitals.length === 1 ? '' : 's'} found</p>
          </div>

          {hospitals.length > 0 ? (
            <div className="hospital-list">
              {hospitals.map((hospital) => (
                <article className="hospital-card" key={hospital.id}>
                  <span className="hospital-icon">✚</span>
                  <div>
                    <h3>{hospital.name}</h3>
                    <p>{hospital.address}</p>
                  </div>
                  <div className="hospital-actions">
                    <strong>{hospital.distance.toFixed(1)} km</strong>
                    <a href={hospital.mapUrl} target="_blank" rel="noreferrer">
                    View on map →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="no-results">
              No mapped hospitals were found within 5 km. Try again from another location.
            </p>
          )}

          <p className="osm-attribution">
            Hospital data © OpenStreetMap contributors. Do not use this page for emergencies.
          </p>
        </section>
      )}
    </main>
  )
}

function PredictionForm({ diseaseKey, onBack }) {
  const disease = diseases[diseaseKey]
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(null)

  const onChange = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function submit(event) {
    event.preventDefault()

    const payload = disease.fields.map((field) => Number(values[field.name]))

    if (payload.some(Number.isNaN)) {
      setStatus('error')
      setMessage('Please fill in every field with a valid number.')
      return
    }

    setStatus('loading')
    setMessage('')
    setResult(null)

    try {
      const response = await fetch(disease.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const text = await response.text()
      let data = {}
      try{
        data = text? JSON.parse(text) : {}
      }catch{
        data = {}
      }

      if (!response.ok) {
        throw new Error(data.detail || 'The prediction request could not be completed.')
      }

      setResult(data)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Could not reach the API. Start the FastAPI server and try again.')
    }
  }

  return (
    <main className="site-page form-page">
      <button className="back" onClick={onBack}>← Back to dashboard</button>

      <section className="form-header">
        <span className={`large-icon ${disease.accent}`}>{disease.icon}</span>
        <div>
          <p className="eyebrow">Educational prediction form</p>
          <h1>{disease.title}</h1>
          <p>{disease.description}</p>
        </div>
      </section>

      <div className="form-layout">
        <form onSubmit={submit} noValidate>
          <div className="field-grid">
            {disease.fields.map((field) => (
              <label key={field.name}>
                {field.label}
                <input
                  type="number"
                  step="any"
                  value={values[field.name] ?? ''}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  placeholder="Enter value"
                  required
                />
                {field.hint && <small>{field.hint}</small>}
              </label>
            ))}
          </div>

          <button className="primary submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Analyzing…' : 'Get prediction'} <span>→</span>
          </button>
        </form>

        <aside className="result-panel">
          <p className="eyebrow">Screening result</p>

          {status === 'success' ? (
            <div className="result">
              <span className={result.prediction ? 'result-icon risk' : 'result-icon clear'}>
                {result.prediction ? '!' : '✓'}
              </span>
              <h2>{result.result}</h2>
              <p>This is a project model output for education—not a medical diagnosis.</p>
            </div>
          ) : (
            <div className="empty-result">
              <span>◌</span>
              <p>Your result will appear here after analysis.</p>
            </div>
          )}

          {status === 'error' && <p className="error">{message}</p>}
        </aside>
      </div>
    </main>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activePage, setActivePage] = useState('home')
  const [selectedDisease, setSelectedDisease] = useState(null)

  function openDashboard() {
    setSelectedDisease(null)
    setActivePage('dashboard')
  }

  function selectDisease(diseaseKey) {
    setSelectedDisease(diseaseKey)
  }

  function logout() {
    setSelectedDisease(null)
    setActivePage('home')
    setLoggedIn(false)
  }

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />
  }

  let content

  if (selectedDisease) {
    content = <PredictionForm diseaseKey={selectedDisease} onBack={openDashboard} />
  } else if (activePage === 'dashboard') {
    content = <DashboardPage selectDisease={selectDisease} />
  } else if (activePage === 'guide') {
    content = <HealthGuidePage />
  } else if (activePage === 'lab') {
    content = <LabTestsPage openDashboard={openDashboard} />
  } else if (activePage === 'nearby') {
    content = <NearbyCarePage />
  } else {
    content = <HomePage openDashboard={openDashboard} openGuide={() => setActivePage('guide')} />
  }

  return (
    <>
      <div className="dynamic-background"></div>
      <NavBar
        activePage={activePage}
        setActivePage={(page) => {
          setSelectedDisease(null)
          setActivePage(page)
        }}
        onLogout={logout}
      />

      <div className="page-transition" key={selectedDisease ?? activePage}>
        {content}
      </div>

      <footer className="global-footer">
        <p className="footer-main">Explore. Understand. Take the next step.</p>
        <p className="footer-sub">Choose a health screening model to begin.</p>
      </footer>
    </>
  )
}