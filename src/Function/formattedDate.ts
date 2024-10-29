const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
  
    return date.toLocaleDateString('th-TH', options);
  };
  
  export default formatDate;
  