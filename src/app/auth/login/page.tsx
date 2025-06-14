
    try {
      const res = await fetch('https://be-production-0885.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email, // Menggunakan email sebagai username
          password: formData.password,
        }),
      });

      const result = await res.json();
      console.log('Response Body:', result);

      if (!res.ok) {
        alert(result.message || 'Login gagal');
      } else {
        // Simpan token JWT setelah login berhasil
        localStorage.setItem('jwtToken', result.token); // Simpan token ke localStorage

        alert('Login berhasil!');
        router.push('/'); // Menggunakan router.push untuk redirect ke halaman utama
      }

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat login');
    }
  };
